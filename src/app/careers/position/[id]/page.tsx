'use client';
import { useParams } from 'next/navigation';
import { JOB_LISTINGS } from '../constants/constants';
import Link from 'next/link';

export default function PositionPage() {
  const params = useParams();
  const id = Number(params?.id); 

  const job = JOB_LISTINGS.find((job) => job.id === id);

  if (!job) {
    return (
      <div>
        <h1>Job not found!</h1>
        <Link href="/careers">← Back to Careers</Link>
      </div>
    );
  }

  return (
    <div>
      <h1>{job.title}</h1>
      <p><strong>Location:</strong> {job.location}</p>
      <p><strong>Team:</strong> {job.team}</p>
      <p><strong>Work Type:</strong> {job.workType}</p>
    </div>
  );
}
