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
    setValue,
  } = useForm({
    resolver: yupResolver(vineConfigSchema),
    defaultValues: {
      newVineDataFilePath: '',
      vineFileName: 'vine_data.txt',
      mugshotDirectory: '',
      courtSectionHeader: '[COURT_DATA]',
      jailSectionHeader: '[JAIL_DATA]',
      arrestSectionHeader: '[ARREST_DATA]',
      chargeSectionHeader: '[CHARGE_DATA]',
      offenderSectionHeader: '[OFFENDER_DATA]',
    }
  });

  useEffect(() => {
    if (vineConfig) {
      // Reset form with fetched data, using current values instead of placeholders
      const formData = {
        newVineDataFilePath: vineConfig.newVineDataFilePath || '',
        vineFileName: vineConfig.vineFileName || 'vine_data.txt',
        mugshotDirectory: vineConfig.mugshotDirectory || '',
        courtSectionHeader: vineConfig.courtSectionHeader || '[COURT_DATA]',
        jailSectionHeader: vineConfig.jailSectionHeader || '[JAIL_DATA]',
        arrestSectionHeader: vineConfig.arrestSectionHeader || '[ARREST_DATA]',
        chargeSectionHeader: vineConfig.chargeSectionHeader || '[CHARGE_DATA]',
        offenderSectionHeader: vineConfig.offenderSectionHeader || '[OFFENDER_DATA]',
      };
      reset(formData);
    }
  }, [vineConfig, reset]);

  const onSubmit = (data) => {
    updateVineConfig(data);
  };

  if (isLoading) {
    return (
        <div className="flex justify-center items-center py-6">
          <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-blue-500"></div>
          <span className="ml-2 text-sm text-gray-600">Loading configuration...</span>
        </div>
    );
  }

  return (
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <FormSection title="File Paths" description="Configure VINE file locations and directories">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
            <FormInput
                label="New Vine Data File Path"
                {...register('newVineDataFilePath')}
                error={errors.newVineDataFilePath?.message}
                required
            />
            <FormInput
                label="Vine File Name"
                {...register('vineFileName')}
                error={errors.vineFileName?.message}
                required
            />
            <FormInput
                label="Mugshot Directory"
                {...register('mugshotDirectory')}
                error={errors.mugshotDirectory?.message}
                required
            />
          </div>
        </FormSection>

        <FormSection title="Section Headers" description="Configure data section headers for different record types">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
            <FormInput
                label="Court Section Header"
                {...register('courtSectionHeader')}
                error={errors.courtSectionHeader?.message}
                required
            />
            <FormInput
                label="Jail Section Header"
                {...register('jailSectionHeader')}
                error={errors.jailSectionHeader?.message}
                required
            />
            <FormInput
                label="Arrest Section Header"
                {...register('arrestSectionHeader')}
                error={errors.arrestSectionHeader?.message}
                required
            />
            <FormInput
                label="Charge Section Header"
                {...register('chargeSectionHeader')}
                error={errors.chargeSectionHeader?.message}
                required
            />
            <FormInput
                label="Offender Section Header"
                {...register('offenderSectionHeader')}
                error={errors.offenderSectionHeader?.message}
                required
            />
          </div>
        </FormSection>

        <div className="flex justify-end pt-2">
          <Button type="submit" loading={isUpdating} className="bg-blue-600 hover:bg-blue-700">
            Save VINE Configuration
          </Button>
        </div>
      </form>
  );
};

export default VineConfigForm;