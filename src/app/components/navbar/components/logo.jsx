import Image from 'next/image'
import Link from 'next/link'

export default function Logo({ textColor }) {
  return (
    <Link
      href='/'
      className='-m-1.5 flex items-center space-x-2 p-1.5 sm:space-x-3'
    >
      <Image
        className='h-7 w-7 sm:h-8 sm:w-8'
        src='/images/logoCommission.png'
        alt=''
        style={{ width: '12vh', height: '12vh', transform: `scale(1.5)` }}
        width={300}
        height={300}
      />
    </Link>
  )
}
