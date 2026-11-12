'use server';
import { register } from '@/app/actions/auth';

export default async function RegisterForm() {
  return (
    <form action={register} method="POST">
      <input type="email" name="email" />
      <input type="password" name="password" />
      <input type="password" name="confPassword"></input>
      <button type="submit">Зарегистрироваться</button>
    </form>
  );
}
