'use client';

import { signIn } from 'next-auth/react';

export default function SignIn() {
  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    await signIn('credentials', {
      email: formData.get('email') as string,
      password: formData.get('password') as string,
    });
  }

  return (
    <form onSubmit={handleSubmit}>
      <input name="email" type="email" placeholder="Email" />
      <input name="password" type="password" placeholder="Пароль" />
      <button type="submit">Войти</button>
    </form>
  );
}
