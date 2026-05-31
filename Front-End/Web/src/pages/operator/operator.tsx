import OperatorBlock from "@/components/ui/core/block/operator/operator-block"

import { Navigate, useParams } from "react-router"

const OperatorPage = () => {
  const { id } = useParams<{ id: string }>()

  if (!id) {
    return <Navigate to={"/dashboard/operator"} />
  }
  return <OperatorBlock id={id} />
}

export default OperatorPage
