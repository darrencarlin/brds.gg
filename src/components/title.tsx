interface Props {
  children: React.ReactNode;
}

export const Title = ({ children }: Props) => {
  return <h3 className="text-3xl font-black uppercase mb-4">{children}</h3>;
};
