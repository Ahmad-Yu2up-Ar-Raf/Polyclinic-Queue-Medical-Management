// @/components/ui/core/block/monitor/monitor-block.tsx
import type {
  Dipanggil,
  MonitorResponse,
  PoliElement,
} from "@/components/ui/core/block/monitor/types/monitor-types"
import { useAntrianSpeech } from "@/hooks/use-antrian-speech"
import { MonitorHeader } from "./components/monitor-header"
import { MonitorCalledList } from "./components/monitor-called-list"
import { MonitorPoliGrid } from "./components/monitor-poli-grid"

type ComponentsProps = {
  Data: MonitorResponse
}

const MonitorBlock = ({ Data }: ComponentsProps) => {
  // Destructuring Data
  const dipanggil: Dipanggil[] = Data.data?.dipanggil ?? []
  const poli: PoliElement[] = Data.data?.poli ?? []

  // Panggil Realtime Hook Text-To-Speech
  useAntrianSpeech(dipanggil)

  return (
    <div className="m-auto w-full max-w-6xl">
      <MonitorHeader />

      {/* Wrapper utama yang menggantikan wire:poll.2s styling */}
      <div className="m-auto flex h-full w-full flex-1 flex-col gap-7 rounded-xl px-7 py-5 md:gap-6">
        <MonitorCalledList data={dipanggil} />
        <MonitorPoliGrid data={poli} />
      </div>
    </div>
  )
}

export default MonitorBlock
