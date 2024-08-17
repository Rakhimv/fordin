import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button } from "@nextui-org/react";
import { IoIosWarning } from "react-icons/io";
export default function Modals({ onOpen, isOpen, onOpenChange, func }: any) {

  console.log(onOpen);

  return (
    <>
      <Modal
        backdrop="blur"
        isOpen={isOpen}
        placement="center"
        className="max-w-[350px]"
        onOpenChange={onOpenChange}
        hideCloseButton
        isDismissable={false}
        isKeyboardDismissDisabled={false}
        motionProps={{
          variants: {
            enter: {
              y: 0,
              opacity: 1,
              transition: {
                duration: 0.3,
                ease: "easeOut",
              },
            },
            exit: {
              y: -20,
              opacity: 0,
              transition: {
                duration: 0.2,
                ease: "easeIn",
              },
            },
          }
        }}
      >
        <ModalContent className="bg-[#131313] text-white" >
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                <div className="flex items-center gap-[10px]">
                  <IoIosWarning color="orange" />
                  Важно
                </div>
              </ModalHeader>
              <ModalBody>
                <p>
                Просмотр этого сайта может вызвать эмоциональный дискомфорт из-за возможных неожиданных или личных сообщений.
                </p>

              </ModalBody>
              <ModalFooter>
                <Button color="default" className="w-full" onClick={() => func(onClose)}>
                  Ок
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
