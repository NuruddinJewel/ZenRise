export default function Loading() {
    return (
        <div className="flex flex-1 flex-col items-center justify-center gap-6 bg-base-100 px-6 py-24">
            <div className="relative flex h-16 w-16 items-center justify-center">
                {/* Outer pulse ring */}
                <span className="absolute h-full w-full animate-ping rounded-full bg-primary/20" />
                {/* Middle ring */}
                <span className="absolute h-12 w-12 rounded-full border-2 border-primary/30" />
                {/* Spinning arc */}
                <span className="absolute h-16 w-16 animate-spin rounded-full border-2 border-transparent border-t-primary border-r-secondary" />
                {/* Center dot */}
                <span className="h-3 w-3 rounded-full bg-accent" />
            </div>

            <div className="text-center">
                <p className="text-sm font-medium text-base-content">
                    Fund<span className="text-primary">Rise</span>
                </p>
                <p className="mt-1 text-xs text-neutral-content">Loading, please wait...</p>
            </div>
        </div>
    );
}