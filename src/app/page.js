// /app/page.js
import Link from 'next/link';

export default function Home() {
  return (
    <div>
      <h1>Assignments</h1>
      <ul>
        {/* Add your other assignment links here */}
        <li><Link href="/week-4">Week 4 Assignment</Link></li>
      </ul>
    </div>
  );
}
