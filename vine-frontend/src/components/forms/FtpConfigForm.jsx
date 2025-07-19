import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { ftpConfigSchema } from '../../utils/validation';
import FormInput from './FormInput';
import FormSection from './FormSection';
import Button from '../ui/Button';
import { useFtpConfig } from '../../hooks/useFtpConfig';

const FtpConfigForm = () => {
  const { ftpConfig, updateFtpConfig, isUpdating, isLoading } = useFtpConfig();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm({
    resolver: yupResolver(ftpConfigSchema),
    defaultValues: {
      ftpHost: '',
      ftpPort: 21,
      ftpUsername: '',
      ftpPassword: '',
      ftpRemotePath: '/',
      useSftp: false,
    }
  });

  const useSftp = watch('useSftp');

  useEffect(() => {
    if (ftpConfig) {
      // Reset form with fetched data, using current values instead of placeholders
      const formData = {
        ftpHost: ftpConfig.ftpHost || '',
        ftpPort: ftpConfig.ftpPort || (ftpConfig.useSftp ? 22 : 21),
        ftpUsername: ftpConfig.ftpUsername || '',
        ftpPassword: ftpConfig.ftpPassword || '',
        ftpRemotePath: ftpConfig.ftpRemotePath || '/',
        useSftp: ftpConfig.useSftp || false,
      };
      reset(formData);
    }
  }, [ftpConfig, reset]);

  const onSubmit = (data) => {
    // Auto-adjust port if SFTP is enabled and port is still default FTP port
    if (data.useSftp && data.ftpPort === 21) {
      data.ftpPort = 22;
    } else if (!data.useSftp && data.ftpPort === 22) {
      data.ftpPort = 21;
    }
    updateFtpConfig(data);
  };

  if (isLoading) {
    return (
        <div className="flex justify-center items-center py-6">
          <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-blue-500"></div>
          <span className="ml-2 text-sm text-gray-600">Loading FTP configuration...</span>
        </div>
    );
  }

  return (
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <FormSection title="FTP/SFTP Settings" description="Configure remote file transfer connection">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
            <FormInput
                label="FTP Host"
                {...register('ftpHost')}
                error={errors.ftpHost?.message}
                required
            />
            <FormInput
                label="FTP Port"
                type="number"
                {...register('ftpPort', { valueAsNumber: true })}
                error={errors.ftpPort?.message}
                required
            />
            <FormInput
                label="FTP Username"
                {...register('ftpUsername')}
                error={errors.ftpUsername?.message}
                required
            />
            <FormInput
                label="FTP Password"
                type="password"
                {...register('ftpPassword')}
                error={errors.ftpPassword?.message}
                required
            />
            <FormInput
                label="Remote Path"
                {...register('ftpRemotePath')}
                error={errors.ftpRemotePath?.message}
                required
            />
            <div className="flex items-center space-x-2 mt-2">
              <input
                  type="checkbox"
                  id="useSftp"
                  {...register('useSftp')}
                  className="h-3 w-3 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="useSftp" className="text-xs font-medium text-gray-700">
                Use SFTP (Secure FTP)
              </label>
            </div>
          </div>

          {useSftp && (
              <div className="mt-3 p-2 bg-blue-50 border border-blue-200 rounded">
                <p className="text-xs text-blue-700">
                  <strong>SFTP Mode:</strong> Using secure file transfer protocol. Default port is 22 for SFTP connections.
                  {watch('ftpPort') === 21 && (
                      <span className="block mt-1 text-blue-600">
                      💡 Consider changing port to 22 for SFTP
                    </span>
                  )}
                </p>
              </div>
          )}
        </FormSection>

        <div className="flex justify-end pt-2">
          <Button type="submit" loading={isUpdating} className="bg-blue-600 hover:bg-blue-700">
            Save FTP Configuration
          </Button>
        </div>
      </form>
  );
};

export default FtpConfigForm;