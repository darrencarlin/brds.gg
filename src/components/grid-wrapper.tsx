interface Props {
  children: React.ReactNode;
}

export const GridWrapper = ({ children }: Props) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 xl:grid-cols-8 gap-4 mb-4">
      {children}
    </div>
  );
};
