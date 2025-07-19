import * as yup from 'yup';

// Schema for VINE Configuration Form - matching the form field names
export const vineConfigSchema = yup.object().shape({
  newVineDataFilePath: yup
      .string()
      .required('New vine data file path is required'),

  vineFileName: yup
      .string()
      .required('Vine file name is required'),

  mugshotDirectory: yup
      .string()
      .required('Mugshot directory is required'),

  courtSectionHeader: yup
      .string()
      .required('Court section header is required'),

  jailSectionHeader: yup
      .string()
      .required('Jail section header is required'),

  arrestSectionHeader: yup
      .string()
      .required('Arrest section header is required'),

  chargeSectionHeader: yup
      .string()
      .required('Charge section header is required'),

  offenderSectionHeader: yup
      .string()
      .required('Offender section header is required'),
});

// Schema for FTP Configuration Form - matching the form field names
export const ftpConfigSchema = yup.object().shape({
  ftpHost: yup
      .string()
      .required('FTP host is required'),

  ftpPort: yup
      .number()
      .positive('FTP port must be a positive number')
      .integer('FTP port must be an integer')
      .min(1, 'FTP port must be at least 1')
      .max(65535, 'FTP port must be less than 65536')
      .required('FTP port is required'),

  ftpUsername: yup
      .string()
      .required('FTP username is required'),

  ftpPassword: yup
      .string()
      .required('FTP password is required'),

  ftpRemotePath: yup
      .string()
      .required('FTP remote path is required'),

  useSftp: yup
      .boolean()
      .default(false),
});