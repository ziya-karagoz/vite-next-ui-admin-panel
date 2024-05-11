import { useFormik } from "formik";
import React from "react";
import { IAdminUpdatePasswordRequest } from "../../core/models/admin.interface";
import * as Yup from "yup";
import Modal from "@base/components/common/modals/Modal";
import { updateAdminPassword } from "../../core/api/admin.request";
import toast from "react-hot-toast";
type Props = {
    adminId?: number;
    open: boolean;
    onClose: () => void;
};

const validateSchema = Yup.object().shape({
    password: Yup.string().required("Şifre alanı boş bırakılamaz").min(6, "Şifre en az 6 karakter olmalıdır"),
    password_confirm: Yup.string()
        .required("Şifre tekrarı alanı boş bırakılamaz")
        .oneOf([Yup.ref("password")], "Şifreler uyuşmuyor"),
});

const UpdateAdminPassword: React.FC<Props> = ({ adminId, open, onClose }) => {
    const formik = useFormik({
        initialValues: {
            password: "",
            password_confirm: "",
        } as IAdminUpdatePasswordRequest,
        validationSchema: validateSchema,
        onSubmit: (values) => {
            if (adminId)
                updateAdminPassword({ id: adminId!, data: values }).then(() => {
                    toast.success("Şifre başarıyla güncellendi");
                    onClose();
                });
        },
    });

    return (
        <form onSubmit={formik.handleSubmit}>
            <Modal open={open} onClose={onClose}>
                <Modal.Header>
                    <h2 className="text-lg font-semibold">Şifre Güncelle</h2>
                </Modal.Header>
                <Modal.Body>
                    <div className="max-w-sm mx-auto">
                        <div className="mb-3">
                            <label
                                htmlFor="password"
                                className="block mb-2 text-sm font-normal text-gray-600 "
                            >
                                Şifre
                            </label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                className="bg-white border border-gray-200 text-gray-900 text-sm rounded-md focus:outline-red-100 block w-full p-2.5"
                                placeholder="********"
                                value={formik.values.password}
                                onChange={formik.handleChange}
                            />
                            {formik.touched.password && formik.errors.password && (
                                <p className="mt-2 text-sm text-red-500">
                                    {formik.errors.password}
                                </p>
                            )}
                        </div>
                        {/* password confirm */}

                        <div className="mb-3">
                            <label
                                htmlFor="password_confirm"
                                className="block mb-2 text-sm font-normal text-gray-600 "
                            >
                                Şifre Tekrarı
                            </label>
                            <input
                                type="password"
                                id="password_confirm"
                                name="password_confirm"
                                className="bg-white border border-gray-200 text-gray-900 text-sm rounded-md focus:outline-red-100 block w-full p-2.5"
                                placeholder="********"
                                value={formik.values.password_confirm}
                                onChange={formik.handleChange}
                            />
                            {formik.touched.password_confirm &&
                                formik.errors.password_confirm && (
                                    <p className="mt-2 text-sm text-red-500">
                                        {formik.errors.password_confirm}
                                    </p>
                                )}
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <div className="flex justify-center items-center gap-2">
                        <button
                            type="submit"
                            className="text-white bg-red-500 hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
                        >
                            Kaydet
                        </button>
                        <button
                            type="button"
                            className="text-gray-900 bg-gray-50 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm sm:w-auto px-5 py-2.5 text-center"
                            onClick={onClose}
                        >
                            İptal
                        </button>
                    </div>
                </Modal.Footer>
            </Modal>
        </form>
    );
};

export default UpdateAdminPassword;
