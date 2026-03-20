export default function LoadingButton({
  initialValue,
  pendingValue,
  isPending,
}) {
  return (
    <>
      {isPending ? (
        <>
          {pendingValue}
          <span className="flex gap-1">
            <span className="w-1 h-1 bg-white rounded-full animate-bounce"></span>
            <span className="w-1 h-1 bg-white rounded-full animate-bounce [animation-delay:0.2s]"></span>
            <span className="w-1 h-1 bg-white rounded-full animate-bounce [animation-delay:0.4s]"></span>
          </span>
        </>
      ) : (
        initialValue
      )}
    </>
  );
}
