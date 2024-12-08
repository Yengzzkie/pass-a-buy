import { useState } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { UserPlusIcon, EyeIcon } from "@heroicons/react/24/solid";
import {
  Card,
  CardHeader,
  Input,
  Typography,
  Button,
  CardBody,
  Chip,
  CardFooter,
  Tabs,
  TabsHeader,
  Tab,
  Avatar,
  IconButton,
  Tooltip,
} from "@material-tailwind/react";
import { usePostData } from "../stores/useDataStore";



export default function PostsTable() {
  const { postData, setPostData } = usePostData();
  const [order, setOrder] = useState("Newest");
  const [initialPostData] = useState([...postData]);

  const TABLE_HEAD = ["Member", "Title", "Status", "Date Posted", ""];

  const TABS = [
    {
      label: "All",
      value: "all",
    },
    {
      label: "Newest",
      value: "newest",
      onclick: () => {
        if (order !== "Oldest") {
          setPostData(initialPostData);
          setOrder("Oldest");
        }
      },
    },
    {
      label: "Oldest",
      value: "reverse",
      onclick: () => {
        if (order !== "Newest") {
          reversePosts();
          setOrder("Newest");
        }
      },
    },
  ];

  // This will get the posts of the user
  // function filterPosts() {
  //   if (userID) {
  //     const filteredPost = postData.filter((post) => post.userId === userID.id);
  //     setPostData(filteredPost);
  //   }
  // }

  // // Show all posts
  // function showAllPosts() {
  //   setPostData(initialPostData);
  // }

  // // Reverse posts
  function reversePosts() {
    const reversedPost = [...postData].reverse();
    setPostData(reversedPost);
  }

  return (
    <Card className="overflow-x-hidden h-full w-full rounded-none">
      <CardHeader floated={false} shadow={false} className="rounded-none">
        <div className="mb-8 flex flex-col lg:flex-row items-center justify-between gap-8">
          <div>
            <Typography variant="h5" color="blue-gray">
              Posts list
            </Typography>
            <Typography color="gray" className="mt-1 font-normal">
              See information about all postings
            </Typography>
          </div>
          <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
            <Button variant="outlined" size="sm">
              view all
            </Button>
            <Button className="flex items-center gap-3" size="sm">
              <UserPlusIcon strokeWidth={2} className="h-4 w-4" /> Add member
            </Button>
          </div>
        </div>
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <Tabs value="all" className="mx-auto lg:mr-auto w-full">
            <TabsHeader className="flex flex-col md:flex-row">
              {TABS.map(({ label, value, onclick }) => (
                <Tab key={value} value={value} onClick={onclick}>
                  &nbsp;&nbsp;{label}&nbsp;&nbsp;
                </Tab>
              ))}
            </TabsHeader>
          </Tabs>
          <div className="w-full md:w-3/4 mr-auto">
            <Input
              label="Search"
              icon={<MagnifyingGlassIcon className="h-5 w-5" />}
            />
          </div>
        </div>
      </CardHeader>
      <CardBody className="overflow-scroll px-0">
        <table className="mt-4 w-full min-w-max table-auto text-left">
          <thead>
            <tr>
              {TABLE_HEAD.map((head) => (
                <th
                  key={head}
                  className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4"
                >
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal leading-none opacity-70"
                  >
                    {head}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {postData.map((post, index) => {
              const isLast = index === postData.length - 1;
              const classes = isLast
                ? "p-4"
                : "p-4 border-b border-blue-gray-50";
              return (
                <tr className={`even:bg-gray-100`} key={post.id}>
                  <td className={classes}>
                    <div className="flex items-center gap-3">
                      <Avatar
                        src={`https://ui-avatars.com/api/?name=${post.user.firstName}-${post.user.lastName}&background=random`}
                        alt={""}
                        size="sm"
                      />
                      <div className="flex flex-col">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {post?.user?.firstName + " " + post?.user?.lastName}
                        </Typography>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal opacity-70"
                        >
                          {post?.user?.email}
                        </Typography>
                      </div>
                    </div>
                  </td>
                  <td className={classes}>
                    <div className="flex flex-col">
                      <Tooltip content={post.title}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal truncate w-[200px]"
                        >
                          {post.title}
                        </Typography>
                      </Tooltip>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal opacity-70"
                      >
                        {"Test2"}
                      </Typography>
                    </div>
                  </td>
                  <td className={classes}>
                    <div className="w-max">
                      <Chip
                        variant="ghost"
                        size="sm"
                        value={
                          post.status === "ACTIVE"
                            ? "ACTIVE"
                            : post.status === "COMPLETED"
                              ? "COMPLETED"
                              : "CLOSED"
                        }
                        color={
                          post.status === "ACTIVE"
                            ? "green"
                            : post.status === "COMPLETED"
                              ? "blue-gray"
                              : "red"
                        }
                      />
                    </div>
                  </td>
                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {new Date(post.createdAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Tooltip content="View full details">
                      <IconButton variant="text">
                        <EyeIcon className="h-4 w-4" />
                      </IconButton>
                    </Tooltip>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </CardBody>
      <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
        <Typography variant="small" color="blue-gray" className="font-normal">
          Page 1 of 10
        </Typography>
        <div className="flex gap-2">
          <Button variant="outlined" size="sm">
            Previous
          </Button>
          <Button variant="outlined" size="sm">
            Next
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
