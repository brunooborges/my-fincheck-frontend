import { HEALTH_URL } from '../../app/config/api';
import { useWakeUp } from '../../app/hooks/useWakeUp';
import { Logo } from './Logo';

interface WakeUpGateProps {
  children: React.ReactNode;
  healthUrl?: string;
  fetchFn?: typeof fetch;
}

// Visitors who prefer reduced motion get a bar that moves in big steps, not a smooth crawl.
const REDUCED_MOTION_TICK_MS = 2000;

function prefersReducedMotion() {
  return (
    typeof window.matchMedia === 'function' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );
}

/**
 * Holds the app back until the API is awake. A free host puts the API to sleep when idle and needs
 * about a minute to start it again; without this the first request would fail (and, for a signed-in
 * visitor, look like an expired session). A warm server answers at once and the visitor sees
 * nothing. A sleeping one gets a progress screen that fills in a minute, and the app opens the
 * moment the server answers.
 */
export function WakeUpGate({ children, healthUrl = HEALTH_URL, fetchFn }: WakeUpGateProps) {
  const { phase, progress, retry } = useWakeUp({
    healthUrl,
    fetchFn,
    tickMs: prefersReducedMotion() ? REDUCED_MOTION_TICK_MS : undefined,
  });

  if (phase === 'ready') {
    return <>{children}</>;
  }

  if (phase === 'checking') {
    return null;
  }

  const percent = Math.round(progress);
  const isSlow = phase === 'slow';

  return (
    <div className='bg-teal-900 fixed top-0 left-0 w-full h-full grid place-items-center p-6'>
      <div role='status' className='grid gap-4 place-items-center text-center text-white max-w-md w-full'>
        <Logo className='h-10 text-white' />
        <h2 className='text-xl font-bold tracking-[-0.5px]'>Acordando o servidor</h2>

        <div
          role='progressbar'
          aria-label='Acordando o servidor'
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={percent}
          className='w-full h-3 rounded-full bg-teal-800 overflow-hidden'
        >
          <div className='h-full rounded-full bg-white' style={{ width: `${percent}%` }} />
        </div>
        <strong className='text-lg'>{percent}%</strong>

        {isSlow ? (
          <>
            <p className='text-teal-50'>
              Está demorando mais que o normal. O servidor ainda pode estar acordando, e o app abre
              assim que ele responder.
            </p>
            <button
              type='button'
              onClick={retry}
              className='bg-white text-teal-900 font-medium rounded-2xl px-6 h-12 hover:bg-teal-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white'
            >
              Tentar novamente
            </button>
          </>
        ) : (
          <p className='text-teal-50'>
            Esta demonstração roda em um servidor gratuito que dorme quando ninguém está usando.
            Acordá-lo leva até um minuto.
          </p>
        )}
      </div>
    </div>
  );
}
