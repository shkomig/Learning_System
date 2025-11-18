import { api } from './client';
import type { Student, StudentProgress, StudentStats } from '../types';

/**
 * Get student by ID
 */
export async function getStudent(id: string): Promise<Student> {
  const response = await api.get(`/students/${id}`);
  return response.data;
}

/**
 * Update student information
 */
export async function updateStudent(
  id: string,
  data: Partial<Student>
): Promise<Student> {
  const response = await api.put(`/students/${id}`, data);
  return response.data;
}

/**
 * Get student progress
 */
export async function getStudentProgress(id: string): Promise<StudentProgress> {
  const response = await api.get(`/students/${id}/progress`);
  return response.data;
}

/**
 * Get student statistics
 */
export async function getStudentStats(id: string): Promise<StudentStats> {
  const response = await api.get(`/students/${id}/stats`);
  return response.data;
}

/**
 * Register new student
 */
export async function registerStudent(data: {
  name: string;
  email?: string;
  password?: string;
  avatar?: string;
}): Promise<{ student: Student; token: string }> {
  const response = await api.post('/auth/register', data);
  return response.data;
}

/**
 * Login student
 */
export async function loginStudent(
  email: string,
  password: string
): Promise<{ student: Student; token: string }> {
  const response = await api.post('/auth/login', { email, password });
  return response.data;
}

/**
 * Logout student
 */
export async function logoutStudent(): Promise<void> {
  await api.post('/auth/logout');
  localStorage.removeItem('auth_token');
}


