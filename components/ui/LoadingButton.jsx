export default function LoadingButton({
  initialValue,
  pendingValue,
  isPending,
}) {
  return (
    <>
      {isPending ? (
        <div className="flex items-center gap-1">
          {pendingValue}
          <span className="flex gap-1">
            <span className="w-1 h-1 bg-current rounded-full animate-bounce"></span>
            <span className="w-1 h-1 bg-current rounded-full animate-bounce [animation-delay:0.2s]"></span>
            <span className="w-1 h-1 bg-current rounded-full animate-bounce [animation-delay:0.4s]"></span>
          </span>
        </div>
      ) : (
        initialValue
      )}
    </>
  );
}
