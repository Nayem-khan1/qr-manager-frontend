import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "./ui/table/index";
import Badge from "./ui/badge/Badge";

const UsersTable = ({ data, type = "user" }) => {
  const getRoleBadgeColor = (role) => {
    switch (role) {
      case "admin":
        return { color: "success", label: "Admin" };
      case "user":
        return { color: "info", label: "User" };
      default:
        return { color: "light", label: role };
    }
  };
  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white ">
      <div className="max-w-full overflow-x-auto">
        <Table>
          <TableHeader className="border-b border-gray-100 ">
            <TableRow>
              <>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs "
                >
                  Name
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs "
                >
                  Email
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs"
                >
                  Payment
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs "
                >
                  Role{" "}
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs "
                >
                  Update Role
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs "
                >
                  Actions
                </TableCell>
              </>
            </TableRow>
          </TableHeader>

          <TableBody className="divide-y divide-gray-100 ">
            {data.map((item) => {
              let badge = { color: "", label: "" };
              if (type === "user") {
                badge = getRoleBadgeColor(item.role);
              }
              return (
                <TableRow key={item._id}>
                  {type === "user" ? (
                    <>
                      <TableCell className="px-5 py-4 text-start">
                        <span className="font-medium text-gray-800 ">
                          {item.name}
                        </span>
                      </TableCell>
                      <TableCell className="px-4 py-3 text-gray-500 text-start ">
                        {item.email}
                      </TableCell>
                      <TableCell className="px-4 py-3 text-gray-500 text-start">
                        {item.isPaid === true ? "Premium" : "Free"}
                      </TableCell>
                      <TableCell className="px-4 py-3 text-start">
                        <Badge color={badge.color} variant="light">
                          {badge.label}
                        </Badge>
                      </TableCell>
                      <TableCell className="px-4 py-3 text-start">
                        <select
                          value={item.role}
                          onChange={(e) =>
                            item.onRoleChange(item._id, e.target.value)
                          }
                          className="px-2 py-1 text-sm border border-gray-300  rounded-md 
             bg-white text-gray-900   
             focus:outline-none focus:ring-2 focus:ring-blue-500 
             transition duration-150 ease-in-out"
                        >
                          <option value="user">User</option>
                          <option value="admin">Admin</option>
                        </select>
                      </TableCell>
                      <TableCell className="px-4 py-3 text-start">
                        <button
                          onClick={() => item.onDelete(item._id)}
                          className="text-sm text-red-500 hover:underline"
                        >
                          Delete
                        </button>
                      </TableCell>
                    </>
                  ) : (
                    <>
                      <TableCell className="px-5 py-4 text-start">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-12"
                        />
                      </TableCell>
                      <TableCell className="px-4 py-3 text-gray-500 text-start ">
                        {item.name}
                      </TableCell>
                      <TableCell className="px-4 py-3 text-start">
                        <Badge color={badge.light} variant="light">
                          {item.category}
                        </Badge>
                      </TableCell>
                      <TableCell className="px-4 py-3 text-start">
                        <Badge color={badge.light} variant="light">
                          {item.subCategory}
                        </Badge>
                      </TableCell>
                      <TableCell className="px-4 py-3 text-start">
                        <Badge color={badge.light} variant="light">
                          {item.price}
                        </Badge>
                      </TableCell>
                      <TableCell className="px-4 py-3 text-start">
                        <Badge color={badge.color} variant="light">
                          {badge.label}
                        </Badge>
                      </TableCell>
                      <TableCell className="px-4 py-3 text-start">
                        <div className="flex items-center justify-end gap-3 h-full">
                          <button
                            onClick={item.onEdit}
                            className="text-blue-600"
                          >
                            <PencilIcon />
                          </button>
                          <button
                            onClick={() => item.onDelete(item._id)}
                            className="text-sm text-red-500 hover:underline"
                          >
                            <TrashBinIcon />
                          </button>
                        </div>
                      </TableCell>
                    </>
                  )}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default UsersTable;
