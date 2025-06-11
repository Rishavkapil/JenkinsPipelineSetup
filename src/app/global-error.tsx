"use client"; // Error components must be Client Components

import { useEffect } from "react";

export default function Error({
  error,
}: {
  error: Error & { digest?: string };
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <center>
      <div className="mt-5 pt-5">
        <h2 className="mt-2">
          Site is temporary unavailable due to server down
        </h2>
        <h3>We are trying to have the site online as soon as possible</h3>
      </div>
    </center>
  );
}
