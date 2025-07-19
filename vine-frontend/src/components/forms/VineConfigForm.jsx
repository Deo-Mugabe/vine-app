import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { vineConfigSchema } from '../../utils/validation';
import FormInput from './FormInput';
import FormSection from './FormSection';
import Button from '../ui/Button';
import { useVineConfig } from '../../hooks/useVineConfig';

const VineConfigForm = () => {
  const { vineConfig, updateVineConfig, isUpdating } = useVineConfig();

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
      reset(vineConfig);
    }
  }, [vineConfig, reset]);

  const onSubmit = (data) => {
    updateVineConfig(data);
  };

  return (
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        <FormSection title="File Paths" description="Configure VINE file locations and directories">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <FormInput
                label="New Vine Data File Path"
                {...register('newVineDataFilePath')}
                error={errors.newVineDataFilePath?.message}
                placeholder="/path/to/vine/data"
                required
            />
            <FormInput
                label="Vine File Name"
                {...register('vineFileName')}
                error={errors.vineFileName?.message}
                placeholder="vine_data.txt"
                required
            />
            <FormInput
                label="Mugshot Directory"
                {...register('mugshotDirectory')}
                error={errors.mugshotDirectory?.message}
                placeholder="/path/to/mugshots"
                required
            />
          </div>
        </FormSection>

        <FormSection title="Section Headers" description="Configure data section headers for different record types">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <FormInput
                label="Court Section Header"
                {...register('courtSectionHeader')}
                error={errors.courtSectionHeader?.message}
                placeholder="[COURT_DATA]"
                required
            />
            <FormInput
                label="Jail Section Header"
                {...register('jailSectionHeader')}
                error={errors.jailSectionHeader?.message}
                placeholder="[JAIL_DATA]"
                required
            />
            <FormInput
                label="Arrest Section Header"
                {...register('arrestSectionHeader')}
                error={errors.arrestSectionHeader?.message}
                placeholder="[ARREST_DATA]"
                required
            />
            <FormInput
                label="Charge Section Header"
                {...register('chargeSectionHeader')}
                error={errors.chargeSectionHeader?.message}
                placeholder="[CHARGE_DATA]"
                required
            />
            <FormInput
                label="Offender Section Header"
                {...register('offenderSectionHeader')}
                error={errors.offenderSectionHeader?.message}
                placeholder="[OFFENDER_DATA]"
                required
            />
          </div>
        </FormSection>

        <div className="flex justify-end">
          <Button type="submit" loading={isUpdating} className="bg-blue-600 hover:bg-blue-700">
            Save VINE Configuration
          </Button>
        </div>
      </form>
  );
};

export default VineConfigForm;