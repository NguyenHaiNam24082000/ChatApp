import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  ActionIcon,
  Avatar,
  Button,
  Divider,
  Group,
  Indicator,
  Menu,
  Paper,
  Text,
} from "@mantine/core";
import React, { useState } from "react";
import { ContextMenu, ContextMenuTrigger, MenuItem } from "react-contextmenu";
import { useDispatch, useSelector } from "react-redux";
import {
  deafen,
  isVoiceConnectedSelector,
  mute,
} from "../../../../store/uiSlice";
import { GetMe } from "../../../../store/userSlice";
import ModalUserSettings from "../../../Modals/ModalUserSettings";
const MENU_ID = "menu-id";

export default function UserArea() {
  const [visible, setVisible] = useState(false);
  const [referenceElement, setReferenceElement] = useState(null);
  const me = GetMe();
  const [openedModalUserSettings, setOpenedModalUserSettings] = useState(false);
  const isVoiceConnected = useSelector(isVoiceConnectedSelector);
  const isMute = useSelector((state) => state.ui.isMute);
  const isDeafen = useSelector((state) => state.ui.isDeafen);
  const dispatch = useDispatch();
  return (
    <>
      <section
        className="flex flex-col justify-between w-full h-auto items-center px-2 z-[2]"
        style={{ flex: "0 0 auto", background: "#ebedef" }}
      >
        {isVoiceConnected && (
          <>
            <div
              className="flex w-full h-auto py-2 items-center relative"
              style={{ borderTop: "2px solid #e5e7eb" }}
            >
              {visible && (
                <div
                  className="absolute bottom-full w-full h-32"
                  style={{ zIndex: 100 }}
                >
                  <Paper padding="md" shadow="xl" className="h-full w-full">
                    <div className="w-full flex justify-center items-center">
                      3 in the huddle
                    </div>
                    <div className="w-full h-full flex-auto flex justify-center items-center gap-2">
                      <Avatar
                        size="default"
                        style={{
                          backgroundColor: "#339af0",
                        }}
                      >
                        YZ
                      </Avatar>
                      <Avatar
                        size="default"
                        style={{
                          backgroundColor: "#339af0",
                        }}
                      >
                        YZ
                      </Avatar>
                    </div>
                  </Paper>
                </div>
              )}
              <Avatar
                size="small"
                style={{
                  backgroundColor: "#339af0",
                  borderRadius: 4,
                  margin: 4,
                }}
              >
                YZ
              </Avatar>
              <div className="flex flex-col">
                <div className="text-xs font-bold">John is talking...</div>
                <Text
                  variant="link"
                  size="xs"
                  className="cursor-pointer"
                  weight={500}
                  ref={setReferenceElement}
                  // onClick={() => setVisible((v) => !v)}
                >
                  3 in the huddle
                </Text>
              </div>
            </div>
            <div
              className="flex flex-col w-full h-auto py-2 gap-2"
              style={{ borderTop: "2px solid #e5e7eb" }}
            >
              <div className="flex w-full flex-auto justify-between items-center">
                <div className="flex flex-col text-green-600">
                  <div className="flex gap-2">
                    <FontAwesomeIcon icon="fa-solid fa-podcast" />
                    <div className="text-sm font-bold">Voice Connected</div>
                  </div>
                  {/* <HoverTextEffect>Test / Phòng chờ</HoverTextEffect> */}
                  <Text
                    variant="link"
                    size="xs"
                    className="cursor-pointer"
                    weight={500}
                  >
                    Test / Phòng chờ
                  </Text>
                </div>
                <ActionIcon>
                  <FontAwesomeIcon
                    icon="fa-solid fa-phone"
                    className="rotate-[135deg]"
                  />
                </ActionIcon>
              </div>
              {false && (
                <div className="group relative h-32 cursor-pointer rounded-md overflow-hidden bg-black">
                  <div
                    className="group-hover:opacity-100 opacity-0 absolute top-0 left-0 flex w-full h-auto z-50 p-2"
                    style={{
                      borderTopLeftRadius: "inherit",
                      borderTopRightRadius: "inherit",
                      background:
                        "linear-gradient(#000,transparent 85%,transparent 100%)",
                      backgroundSize: "cover",
                      backgroundRepeat: "no-repeat",
                      transition: "all 1s ease",
                    }}
                  >
                    <ActionIcon variant="transparent" className="z-50">
                      {/* <IconArrowLeft style={{ color: "#fff" }} /> */}
                    </ActionIcon>
                  </div>
                  <video
                    className="h-full w-full object-cover"
                    autoPlay
                    muted
                    src={"https://www.w3schools.com/html/mov_bbb.mp4"}
                  ></video>
                  <div
                    className="group-hover:opacity-100 opacity-0 absolute bottom-0 left-0 flex w-full h-auto z-50 p-2 justify-between"
                    style={{
                      borderBottomLeftRadius: "inherit",
                      borderBottomRightRadius: "inherit",
                      background:
                        "linear-gradient(to top,#000,transparent 85%,transparent 100%)",
                      backgroundSize: "cover",
                      backgroundRepeat: "no-repeat",
                      transition: "all 1s ease",
                    }}
                  >
                    <div>
                      <ActionIcon variant="transparent" className="z-50">
                        {/* <IconUserCardVideo
                style={{ color: "#fff" }}
                size="extra-large"
              /> */}
                      </ActionIcon>
                    </div>
                    <div className="flex">
                      <Menu
                        position="left"
                        placement="end"
                        control={
                          <div>
                            <ActionIcon
                              variant="transparent"
                              className="z-50 mr-3"
                            >
                              {/* <IconSetting
                      style={{ color: "#fff" }}
                      size="extra-large"
                    /> */}
                            </ActionIcon>
                          </div>
                        }
                      >
                        <Menu.Item>Report problem</Menu.Item>
                        <Menu.Item>Change view</Menu.Item>
                        {/* <Menu.Item onClick={() => setActive(!active)}>
                Picture in picture
              </Menu.Item> */}
                      </Menu>
                      <ActionIcon variant="transparent" className="z-50">
                        {/* <IconStop style={{ color: "#fff" }} size="extra-large" /> */}
                      </ActionIcon>
                    </div>
                  </div>
                </div>
              )}
              <Group grow spacing="xs">
                <Button
                  variant="outline"
                  color="dark"
                  icon={<FontAwesomeIcon icon="fa-solid fa-video" />}
                >
                  Video
                </Button>
                <Button
                  variant="outline"
                  color="dark"
                  //   icon={<MdScreenShare />}
                >
                  Screen
                </Button>
              </Group>
            </div>
          </>
        )}
        <div
          className="flex w-full truncate h-14 justify-between items-center"
          style={{ borderTop: "2px solid #e5e7eb" }}
        >
          <div className="flex truncate items-center gap-2">
            <Menu
              // trigger="hover"
              // delay={250}
              // closeOnScroll={false}
              gutter={5}
              zIndex={401}
              // position="right"
              className="menu justify-center items-center flex-shrink-0"
              control={
                <Indicator
                  sx={{
                    indicator: {
                      zIndex: "5",
                    },
                  }}
                  inline
                  size={16}
                  offset={5}
                  position="bottom-end"
                  color={me.user?.status?.online ? "green" : "gray"}
                  className="cursor-pointer"
                  withBorder
                >
                  {/* <Avatar
                    // size="lg"
                    radius="xl"
                    src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=250&q=80"
                  /> */}
                  <Avatar
                    src={me.user.avatar_url}
                    radius="xl"
                    styles={{
                      placeholder: {
                        color: "#fff",
                        backgroundColor: `#${Math.floor(
                          me.user.accent_color
                        ).toString(16)}`,
                      },
                    }}
                  >
                    {me?.user?.username[0].toUpperCase()}
                    {/* {channel.members[0]._id !== user._id
                      ? channel.members[0].username[0]
                      : channel.members[1].username[0]} */}
                  </Avatar>
                </Indicator>
              }
              size="xl"
            >
              <Menu.Label>
                <div className="flex flex-col">
                  <div className="font-bold text-sm">@{me?.user?.username}</div>
                  <div className="text-xs">Trực tuyến</div>
                </div>
              </Menu.Label>
              <Divider />
              <Menu.Item
                icon={
                  <FontAwesomeIcon
                    icon="fa-solid fa-earth-asia"
                    className="text-green-600"
                  />
                }
              >
                Trực tuyến
              </Menu.Item>
              <Menu.Item
                icon={
                  <FontAwesomeIcon
                    icon="fa-solid fa-clock"
                    className="text-yellow-600"
                  />
                }
              >
                Chờ
              </Menu.Item>
              <Menu.Item
                icon={
                  <FontAwesomeIcon
                    icon="fa-solid fa-circle-minus"
                    className="text-red-600"
                  />
                }
              >
                <div className="flex flex-col gap-1">
                  <div>Vui lòng không làm phiền</div>
                  <div className="text-xs">
                    You will not receive any desktop notifications
                  </div>
                </div>
              </Menu.Item>
              <Menu.Item
                icon={
                  <FontAwesomeIcon
                    icon="fa-solid fa-power-off"
                    className="text-gray-600"
                  />
                }
              >
                <div className="flex flex-col gap-1">
                  <div>Vô hình</div>
                  <div className="text-xs">
                    You will not appear online, but will have full access to all
                    of Textme
                  </div>
                </div>
              </Menu.Item>
              <Divider />
              <Menu.Item icon={"😀"}>Trạng thái tuỳ chỉnh</Menu.Item>
            </Menu>

            <div className="flex flex-col truncate justify-center">
              <div className="font-bold text-xs truncate">
                {me?.user?.username}
              </div>
              <div className="text-xs truncate">#{me?.user?.discriminator}</div>
            </div>
          </div>
          <div className="flex ">
            <ActionIcon
              variant="hover"
              size="lg"
              onClick={() => dispatch(mute(!isMute))}
            >
              <FontAwesomeIcon
                icon={`fa-solid ${
                  isMute ? "fa-microphone-slash" : "fa-microphone"
                }`}
              />
            </ActionIcon>
            <ContextMenuTrigger id="same_unique_identifier">
              <ActionIcon
                variant="hover"
                size="lg"
                onClick={() => dispatch(deafen(!isDeafen))}
              >
                <FontAwesomeIcon
                  icon={`fa-solid ${
                    isDeafen ? "fa-volume-xmark" : "fa-volume-high"
                  }`}
                />
              </ActionIcon>
            </ContextMenuTrigger>
            <ActionIcon
              variant="hover"
              size="lg"
              onClick={() => setOpenedModalUserSettings(true)}
            >
              <FontAwesomeIcon icon="fa-solid fa-gear" />
            </ActionIcon>
          </div>
        </div>
        <ContextMenu id="same_unique_identifier">
          <MenuItem>ContextMenu Item 1</MenuItem>
          <MenuItem>ContextMenu Item 2</MenuItem>
          <MenuItem divider />
          <MenuItem>ContextMenu Item 3</MenuItem>
        </ContextMenu>
      </section>
      <ModalUserSettings
        opened={openedModalUserSettings}
        onClose={() => setOpenedModalUserSettings(false)}
      />
    </>
  );
}
