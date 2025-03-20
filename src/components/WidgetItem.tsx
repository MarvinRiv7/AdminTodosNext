
interface Props {
  title: string;
  children?: React.ReactNode
}

export const WidgetItem = ({title, children}: Props) => {
  return (
    <>
          {children}
    </>
  )
}
