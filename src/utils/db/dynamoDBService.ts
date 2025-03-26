
import { DynamoDB } from 'aws-sdk';
import { dynamoDBConfig } from '@/config/aws-config';

// Initialize DynamoDB
const dynamoDB = new DynamoDB.DocumentClient({
  region: dynamoDBConfig.region,
  credentials: {
    accessKeyId: dynamoDBConfig.credentials.accessKeyId,
    secretAccessKey: dynamoDBConfig.credentials.secretAccessKey,
  },
});

interface CourseItem {
  user_id: string;
  id: string;
  title: string;
  description?: string;
  created_at: string;
  updated_at: string;
  content: any; // Course content structure
}

// Save a course for a user
export const saveCourse = async (courseData: CourseItem) => {
  const params = {
    TableName: dynamoDBConfig.tableName,
    Item: {
      ...courseData,
      created_at: courseData.created_at || new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
  };

  try {
    await dynamoDB.put(params).promise();
    return courseData;
  } catch (error) {
    console.error('Error saving course:', error);
    throw error;
  }
};

// Get all courses for a user
export const getUserCourses = async (userId: string) => {
  const params = {
    TableName: dynamoDBConfig.tableName,
    KeyConditionExpression: 'user_id = :userId',
    ExpressionAttributeValues: {
      ':userId': userId,
    },
  };

  try {
    const result = await dynamoDB.query(params).promise();
    return result.Items as CourseItem[];
  } catch (error) {
    console.error('Error getting user courses:', error);
    throw error;
  }
};

// Get a specific course by ID for a user
export const getCourseById = async (userId: string, courseId: string) => {
  const params = {
    TableName: dynamoDBConfig.tableName,
    Key: {
      user_id: userId,
      id: courseId,
    },
  };

  try {
    const result = await dynamoDB.get(params).promise();
    return result.Item as CourseItem | undefined;
  } catch (error) {
    console.error('Error getting course by ID:', error);
    throw error;
  }
};

// Delete a course
export const deleteCourse = async (userId: string, courseId: string) => {
  const params = {
    TableName: dynamoDBConfig.tableName,
    Key: {
      user_id: userId,
      id: courseId,
    },
  };

  try {
    await dynamoDB.delete(params).promise();
    return true;
  } catch (error) {
    console.error('Error deleting course:', error);
    throw error;
  }
};

// Update a course
export const updateCourse = async (courseData: CourseItem) => {
  const params = {
    TableName: dynamoDBConfig.tableName,
    Key: {
      user_id: courseData.user_id,
      id: courseData.id,
    },
    UpdateExpression: 'set title = :title, description = :description, content = :content, updated_at = :updatedAt',
    ExpressionAttributeValues: {
      ':title': courseData.title,
      ':description': courseData.description || '',
      ':content': courseData.content,
      ':updatedAt': new Date().toISOString(),
    },
    ReturnValues: 'ALL_NEW',
  };

  try {
    const result = await dynamoDB.update(params).promise();
    return result.Attributes as CourseItem;
  } catch (error) {
    console.error('Error updating course:', error);
    throw error;
  }
};
