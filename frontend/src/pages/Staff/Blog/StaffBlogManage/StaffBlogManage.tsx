import React from "react";
import AdminBlog from "../StaffBlog.tsx";
import StaffBlog from "../StaffBlog.tsx";

const StaffBlogManagePage: React.FC = () => {
    return(
      <>
          <StaffBlog isActive={true} />
      </>
    );

}

export default StaffBlogManagePage;