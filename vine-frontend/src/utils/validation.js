import * as yup from 'yup';

// Schema for VINE Configuration Form
export const vineConfigSchema = yup.object().shape({
  vineNewVineFilePath: yup
      .string()
      .required('New vine data file path is required'),

  vineInterFile: yup
      .string()
      .required('Vine file name is required'),

  vineChargesFileHeader: yup
      .string()
      .required('Charges section header is required'),

  vinePrisonerFileHeader: yup
      .string()
      .required('Prisoner section header is required'),
});

// Schema for FTP Configuration Form
export const ftpConfigSchema = yup.object().shape({
  vineFtpServer: yup
      .string()
      .required('FTP server is required'),

  vineFtpUsername: yup
      .string()
      .required('FTP username is required'),

  vineFtpPassword: yup
      .string()
      .required('FTP password is required'),
});