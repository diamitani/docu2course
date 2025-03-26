
// AWS configuration for Cognito and DynamoDB

// Cognito User Pool configuration
export const cognitoConfig = {
  region: 'us-east-1', // Adjust region as needed
  userPoolId: 'us-east-1_8a0zol', // Extracted from the User pool name: User pool - 8a0zol
  userPoolWebClientId: '6j7tc1vs5uqo538s3hjf8sd3r7',
  authenticationFlowType: 'USER_PASSWORD_AUTH',
};

// DynamoDB configuration
export const dynamoDBConfig = {
  region: 'us-east-1', // Adjust region as needed
  credentials: {
    accessKeyId: 'AKIAWPPO6AGOBPQUFOXS',
    secretAccessKey: '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',
  },
  tableName: 'user_courses',
};
