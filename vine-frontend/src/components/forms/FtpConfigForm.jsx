import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { ftpConfigSchema } from '../../utils/validation';
import FormInput from './FormInput';
import FormSection from './FormSection';
import Button from '../ui/Button';
import { useFtpConfig } from '../../hooks/useFtpConfig';

const FtpConfigForm = () => {
  const { ftpConfig, updateFtpConfig, isUpdating } = useFtpConfig();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm({
    resolver: yupResolver(ftpConfigSchema),
  });

  const useSftp = watch('useSftp');

  useEffect(() => {
    if (ftpConfig) {
      reset(ftpConfig);
    }
  }, [ftpConfig, reset]);

  const onSubmit = (data) => {
    updateFtpConfig(data);
  };

  return (
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        <FormSection title="FTP/SFTP Settings" description="Configure remote file transfer connection">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <FormInput
                label="FTP Host"
                {...register('ftpHost')}
                error={errors.ftpHost?.message}
                placeholder="ftp.example.com"
                required
            />
            <FormInput
                label="FTP Port"
                type="number"
                {...register('ftpPort', { valueAsNumber: true })}
                error={errors.ftpPort?.message}
                placeholder="21"
                required
            />
            <FormInput
                label="FTP Username"
                {...register('ftpUsername')}
                error={errors.ftpUsername?.message}
                placeholder="username"
                required
            />
            <FormInput
                label="FTP Password"
                type="password"
                {...register('ftpPassword')}
                error={errors.ftpPassword?.message}
                placeholder="••••••••"
                required
            />
            <FormInput
                label="Remote Path"
                {...register('ftpRemotePath')}
                error={errors.ftpRemotePath?.message}
                placeholder="/remote/path/to/files"
                required
            />
            <div className="flex items-center space-x-3">
              <input
                  type="checkbox"
                  id="useSftp"
                  {...register('useSftp')}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="useSftp" className="text-sm font-medium text-gray-700">
                Use SFTP (Secure FTP)
              </label>
            </div>
          </div>

          {useSftp && (
              <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-sm text-blue-700">
                  <strong>SFTP Mode:</strong> Using secure file transfer protocol. Default port is 22 for SFTP connections.
                </p>
              </div>
          )}
        </FormSection>

        <div className="flex justify-end">
          <Button type="submit" loading={isUpdating} className="bg-blue-600 hover:bg-blue-700">
            Save FTP Configuration
          </Button>
        </div>
      </form>
  );
};

export default FtpConfigForm;