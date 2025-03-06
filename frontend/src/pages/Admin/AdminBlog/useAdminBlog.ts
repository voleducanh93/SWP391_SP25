import {useEffect, useRef, useState} from "react";
import {apiCreateBlog, apiDeleteBlog, apiGetAllBlog, apiGetBlogById, apiUpdateBlog} from "../../../apis/apiBlog.ts";
import {BlogRequest, BlogResponse, UpdateBlogRequest} from "../../../interfaces/Blog.ts";
import {notification} from "antd";
import {useForm} from "antd/es/form/Form";
import {useNavigate, useParams} from "react-router-dom";
import {decodeToken} from "../../../utils/decodeToken.ts";

export const useGetAllBlog = () => {
    const [blogs, setBlogs] = useState<BlogResponse[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>("");
    const hasFetched = useRef(false); // Biến kiểm tra đã gọi API hay chưa
    const [onlyActive, setOnlyActive] = useState<boolean>(true);

    const fetchAllBlog = async () => {
        setLoading(true);

        try {
            const response = await apiGetAllBlog(onlyActive);
            if (response && response.result) {
                console.log("cac: " + response)
                setBlogs(response.result);
            }
        } catch (err) {
            console.error(err);
            setError("Error Fetching All Blog Data");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (hasFetched.current) return; // Nếu đã gọi API trước đó thì không gọi lại
        fetchAllBlog();
        hasFetched.current = true; // Đánh dấu là đã gọi API
    }, []);

    return { blogs, loading, error, fetchAllBlog, onlyActive, setOnlyActive };
};

export const useDeleteBlog = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleDelete = async (blogId: number) => {
        try {
            setError(null);
            setIsLoading(true);
            const response = await apiDeleteBlog(blogId);
            if (!response.isSuccess) throw new Error(response.errorMessages || "Lỗi xảy ra, vui lòng thử lại.");
            notification.success({ message: "Xóa thành công!" });

        }catch (err: any) {
            notification.error({ message: "Lỗi", description: err.message || "Có lỗi xảy ra, vui lòng thử lại." });
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    }

    return {handleDelete, isLoading, error}
}


export const useBlogForm = () => {
    const [form] = useForm();
    const { id } = useParams();
    const navigate = useNavigate();
    const isEditMode = !!id;
    const [loading, setLoading] = useState(false);
    const [editorContent, setEditorContent] = useState("");
    const [imageUrl, setImageUrl] = useState("");

    useEffect(() => {
        if (isEditMode) {
            setLoading(true);
            apiGetBlogById(id)
                .then((response) => {
                    if (response?.result) {
                        form.setFieldsValue({
                            ...response.result,
                        });
                        setEditorContent(response.result.content || "");
                        if (response.result.imageUrl) {
                            setImageUrl(response.result.imageUrl);
                        }
                    }
                })
                .catch(() => {
                    notification.error({ message: "Lỗi", description: "Không thể tải dữ liệu blogs." });
                })
                .finally(() => setLoading(false));
        }
    }, [id, form, isEditMode]);

    const handleSubmit = async (values: any) => {
        setLoading(true);
        try {
            if (isEditMode) {
                const updateBlogData: UpdateBlogRequest = {
                    ...values,
                };
                const response = await apiUpdateBlog(id, updateBlogData);
                if (!response.isSuccess) throw new Error(response.errorMessages || "Lỗi cập nhật blog");
                notification.success({ message: "Cập nhật thành công!" });
            } else {
                const newBlogData: BlogRequest = {
                    ...values,
                    type: "blog",
                    authorName: decodeToken(localStorage.getItem("token"))?.
                   ["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"]
                };
                const response = await apiCreateBlog(newBlogData);
                if (!response.isSuccess) throw new Error(response.errorMessages || "Lỗi tạo blog");
                notification.success({ message: "Tạo blog thành công!" });
            }
            navigate("/admin/blog");
        } catch (error: any) {
            notification.error({ message: "Lỗi", description: error.message || "Có lỗi xảy ra, vui lòng thử lại." });
        } finally {
            setLoading(false);
        }
    };
    return { form, isEditMode, handleSubmit, loading, editorContent, setEditorContent, imageUrl, setImageUrl };
};