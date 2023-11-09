import LocationPin from "../feature/admin/LocationPin";
import useMap from "../feature/hook/use-map";

export default function ModalLocationList({
  setIsLocationModal,
  setIsOpenEditLocation,
  open,
  isOpenOn,
  setIsOpenOn,
}) {
  const { subArea } = useMap();
  console.log(subArea)

  return (
    <>
      {open && (
        <div className="bg-Primary-lightest relative rounded-3xl overflow-auto">
          <div className="flex sticky top-0 left-0 right-0 gap-2 w-full rounded-3xl h-[120px] justify-center items-center bg-Primary-lightest ">
            <input
              type="text"
              className="bg-MonoColor-50 rounded-3xl w-[320px] h-[36px]  outline-non p-4"
              placeholder="search"
            />
            <span className="material-symbols-outlined text-MonoColor-50">
              search
            </span>
          </div>
          <div className="flex flex-col w-full h-full ">
            {subArea ? (
              subArea.map((data, index) => (
                <LocationPin
                  key={index + 1}
                  dataLocation={data}
                  setIsLocationModal={setIsLocationModal}
                  isOpenOn={isOpenOn}
                  setIsOpenOn={setIsOpenOn}
                  setIsOpenEditLocation={setIsOpenEditLocation}
                />
              ))
            ) : (
              <LocationPin
                setIsLocationModal={setIsLocationModal}
                isOpenOn={isOpenOn}
                setIsOpenOn={setIsOpenOn}
                setIsOpenEditLocation={setIsOpenEditLocation}
              />
            )}
          </div>
        </div>
      )}
    </>
  );
}
