// Route verification test script
const routes = [
  '/',
  '/jobs',
  '/jobs/job-1',
  '/companies',
  '/companies/comp-1',
  '/about',
  '/contact',
  '/login',
  '/register',
  '/dashboard',
  '/dashboard/applications',
  '/dashboard/saved',
  '/dashboard/profile',
  '/dashboard/notifications',
  '/recruiter',
  '/recruiter/company',
  '/recruiter/jobs',
  '/recruiter/jobs/new',
  '/recruiter/jobs/job-1/applicants',
  '/admin',
  '/admin/users',
  '/admin/jobs',
  '/admin/applications'
];

async function verifyAll() {
  console.log('Testing JobHub routes on http://localhost:3000...\n');
  let passed = 0;
  let failed = 0;

  for (const route of routes) {
    try {
      const res = await fetch(`http://localhost:3000${route}`);
      if (res.status === 200) {
        console.log(`[PASS 200] ${route}`);
        passed++;
      } else {
        console.error(`[FAIL ${res.status}] ${route}`);
        failed++;
      }
    } catch (err) {
      console.error(`[ERR] ${route} -> ${err.message}`);
      failed++;
    }
  }

  console.log(`\nResults: ${passed} passed, ${failed} failed out of ${routes.length} total routes.`);
  if (failed > 0) process.exit(1);
}

verifyAll();
