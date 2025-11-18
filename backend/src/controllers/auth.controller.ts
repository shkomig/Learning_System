import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function register(req: Request, res: Response): Promise<void> {
  try {
    const { name, email, password, avatar } = req.body;

    // Validate input
    if (!name) {
      res.status(400).json({ error: 'Name is required' });
      return;
    }

    // Check if email already exists
    if (email) {
      const existing = await prisma.student.findUnique({ where: { email } });
      if (existing) {
        res.status(400).json({ error: 'Email already registered' });
        return;
      }
    }

    // Hash password if provided
    let hashedPassword;
    if (password) {
      hashedPassword = await bcrypt.hash(password, 10);
    }

    // Create student
    const student = await prisma.student.create({
      data: {
        name,
        email,
        password: hashedPassword,
        avatar: avatar || '👧',
      },
    });

    // Generate token
    const secret = process.env.JWT_SECRET || 'fallback-secret';
    const token = jwt.sign(
      { studentId: student.id } as object,
      secret
    );

    // Remove password from response
    const { password: _, ...studentData } = student;

    res.status(201).json({
      student: studentData,
      token,
    });
  } catch (error) {
    console.error('Register error:', error);
    res.status(500).json({ error: 'Failed to register student' });
  }
}

export async function login(req: Request, res: Response): Promise<void> {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({ error: 'Email and password are required' });
      return;
    }

    // Find student
    const student = await prisma.student.findUnique({ where: { email } });
    if (!student || !student.password) {
      res.status(401).json({ error: 'Invalid credentials' });
      return;
    }

    // Verify password
    const validPassword = await bcrypt.compare(password, student.password);
    if (!validPassword) {
      res.status(401).json({ error: 'Invalid credentials' });
      return;
    }

    // Update last login
    await prisma.student.update({
      where: { id: student.id },
      data: { lastLoginDate: new Date() },
    });

    // Generate token
    const secret = process.env.JWT_SECRET || 'fallback-secret';
    const token = jwt.sign(
      { studentId: student.id } as object,
      secret
    );

    // Remove password from response
    const { password: _, ...studentData } = student;

    res.json({
      student: studentData,
      token,
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Failed to login' });
  }
}

export async function logout(req: Request, res: Response): Promise<void> {
  // With JWT, logout is handled client-side by removing the token
  res.json({ message: 'Logged out successfully' });
}

