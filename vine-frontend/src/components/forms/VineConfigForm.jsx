import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { vineConfigSchema } from '../../utils/validation';
import FormInput from './FormInput';
import FormSection from './FormSection';
import Button from '../ui/Button';
import { useVineConfig } from '../../hooks/useVineConfig';

const VineConfigForm = () => {
  const { vineConfig, updateVineConfig, isUpdating, isLoading } = useVineConfig();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(vineConfigSchema),
  });

  useEffect(() => {
    if (vineConfig) {
      reset({
        vineChargesFileHeader: vineConfig.vineChargesFileHeader,
        vinePrisonerFileHeader: vineConfig.vinePrisonerFileHeader,
        vineJailIdNumber: vineConfig.vineJailIdNumber,
        vineNewMugShotDirectory: vineConfig.vineNewMugShotDirectory,
        vineMugShotDirectory: vineConfig.vineMugShotDirectory,
        vineNewVineFilePath: vineConfig.vineNewVineFilePath,
        vineInterFile: vineConfig.vineInterFile,
      });
    }
  }, [vineConfig, reset]);

  const onSubmit = (data) => {
    updateVineConfig(data);
  };

  if (isLoading || !vineConfig) {
    return (
        <div className="flex justify-center items-center py-6">
          <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-blue-500"></div>
          <span className="ml-2 text-sm text-gray-600">Loading configuration...</span>
        </div>
    );
  }

  return (
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <FormSection title="VINE System Configuration" description="Configure headers, file paths, and IDs">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
            <FormInput
                label="Charges File Header"
                {...register('vineChargesFileHeader')}
                error={errors.vineChargesFileHeader?.message}
                required
            />
            <FormInput
                label="Prisoner File Header"
                {...register('vinePrisonerFileHeader')}
                error={errors.vinePrisonerFileHeader?.message}
                required
            />
            <FormInput
                label="Jail ID Number"
                {...register('vineJailIdNumber')}
                error={errors.vineJailIdNumber?.message}
                required
            />
            <FormInput
                label="New Mugshot Directory"
                {...register('vineNewMugShotDirectory')}
                error={errors.vineNewMugShotDirectory?.message}
                required
            />
            <FormInput
                label="Mugshot Directory"
                {...register('vineMugShotDirectory')}
                error={errors.vineMugShotDirectory?.message}
                required
            />
            <FormInput
                label="New VINE File Path"
                {...register('vineNewVineFilePath')}
                error={errors.vineNewVineFilePath?.message}
                required
            />
            <FormInput
                label="VINE Interfile Name"
                {...register('vineInterFile')}
                error={errors.vineInterFile?.message}
                required
            />
          </div>
        </FormSection>

        <div className="flex justify-end pt-2">
          <Button type="submit" loading={isUpdating} className="bg-blue-600 hover:bg-blue-700">
            Save Configuration
          </Button>
        </div>
      </form>
  );
};

export default VineConfigForm;
