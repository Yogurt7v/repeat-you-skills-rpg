import styles from "./page.module.css";

const branches = [
  { slug: "frontend", title: "Врата Фронтенда", desc: "App Router, RSC, CSS Modules, Redux Toolkit" },
  { slug: "data", title: "Пещеры Данных", desc: "Prisma, PostgreSQL, Server Actions, Auth.js" },
  { slug: "deploy", title: "Кузница Развёртывания", desc: "Docker, Nginx, GitHub Actions, Sentry" },
];

export default function MapPage() {
  return (
    <main className={styles.main}>
      <h1>Карта мира</h1>
      <ul className={styles.branches}>
        {branches.map((b) => (
          <li key={b.slug} className={styles.branch}>
            <h2>{b.title}</h2>
            <p>{b.desc}</p>
            <span className={styles.lock}>🔒 Заблокировано</span>
          </li>
        ))}
      </ul>
    </main>
  );
}
