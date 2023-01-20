import Header from "@/components/Header"
import { BanknotesIcon, ClockIcon } from "@heroicons/react/24/outline"
import {
  MediaRenderer,
  useActiveListings,
  useContract,
} from "@thirdweb-dev/react"
import { ListingType } from "@thirdweb-dev/sdk"

const Home = () => {
  const { contract } = useContract(
    process.env.NEXT_PUBLIC_MARKETPLACE_CONTRACT,
    "marketplace"
  )

  const { data: listings, isLoading: isLoadingListings } =
    useActiveListings(contract)
  // console.log(listings)

  return (
    <div>
      <Header />
      <main className="max-w-6xl mx-auto py-2 px-6">
        {isLoadingListings ? (
          <p className="text-center animate-pulse text-blue-500">Loading....</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 mx-auto">
            {listings?.map((listings) => (
              <div
                key={listings.id}
                className="flex flex-col card hover:scale-105 transition-all duration-150 ease-out"
              >
                <div className="flex-1 flex flex-col pb-2 items-center">
                  <MediaRenderer className="w-44" src={listings.asset.image} />
                </div>
                <div className="pt-2 space-y-4">
                  <div>
                    <h2 className="text-lg truncate">{listings.asset.name}</h2>
                    <hr />
                    <p
                      className="truncate text-sm text-gray-600 mt-2
                    "
                    >
                      {listings.asset.description}
                    </p>
                  </div>
                  <p className=" space-x-1">
                    <span>
                      {listings.buyoutCurrencyValuePerToken.displayValue}
                    </span>
                    <span className="font-bold">
                      {listings.buyoutCurrencyValuePerToken.symbol}
                    </span>
                  </p>
                  <div
                    className={`flex justify-end items-center space-x-1 text-sm w-fit border ml-auto p-2 rounded-lg text-white ${
                      listings.type === ListingType.Direct
                        ? "bg-blue-500"
                        : "bg-red-500"
                    }`}
                  >
                    <p>
                      {listings.type === ListingType.Direct
                        ? "Buy Now"
                        : "Aution"}
                    </p>
                    {listings.type === ListingType.Direct ? (
                      <BanknotesIcon className="h-4" />
                    ) : (
                      <ClockIcon className="h-4" />
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}

export default Home
