import { Link } from 'wouter';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 text-center">
      <div className="space-y-4 max-w-md">
        <h1 className="text-4xl font-bold tracking-tight text-white md:text-6xl">
          <span className="block">404</span>
          <span className="block mt-2 text-primary">Page Not Found</span>
        </h1>
        <p className="text-lg text-gray-400">
          The page you're looking for doesn't exist or has been removed.
        </p>
        <div className="mt-8">
          <Link href="/">
            <a className="inline-flex items-center justify-center px-6 py-3 text-base font-medium text-white bg-primary hover:bg-primary/90 rounded-md transition-colors">
              Return to Solar System
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
}