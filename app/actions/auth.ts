'use server';

import { prisma } from '@/lib/db';
import bcrypt from 'bcryptjs';
import { redirect } from 'next/navigation';

export async function login(formData: FormData) {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  const res = await fetch(
    'http://localhost:3000/api/auth/callback/credentials',
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({ email, password }),
    }
  );

  if (!res.ok) {
    return { error: 'Неверный email или пароль' };
  }

  return { success: true };
}

export async function register(formData: FormData) {
  const email = (formData.get('email') as string | null)?.trim().toLowerCase();
  const password = formData.get('password') as string | null;
  const confPassword = formData.get('confPassword') as string | null;

  // Базовая валидация
  if (!email || !password || !confPassword) {
    return { ok: false, message: 'Заполните все поля' };
  }
  if (password !== confPassword) {
    return { ok: false, message: 'Пароли не совпадают' };
  }
  if (password.length < 8) {
    return { ok: false, message: 'Пароль должен быть не короче 8 символов' };
  }

  const passwordHash = await bcrypt.hash(password, 12);

  try {
    await prisma.user.create({
      data: {
        email,
        passwordHash,
        name: email.split('@')[0],
        role: 'user',
      },
    });
  } catch (e) {
    return { ok: false, message: 'Не удалось создать аккаунт' };
  }

  redirect('/');
}
