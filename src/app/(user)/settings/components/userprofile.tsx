/** @format */

import React, { useEffect, useState } from "react";
import { useFormik, FormikProps } from "formik";
import { Col, Row } from "react-bootstrap";
import moment from "moment";
import {
  useGetUserProfileQuery,
  useUpdateProfileMutation,
  useUploadFileMutation,
} from "@/services/rtk.api.service";
import SelfieUpload from "@/common/UploadFile/selfieUpload";
import toaster from "@/common/Toast";
import {
  FILE_SIZE,
  SUPPORTED_FORMATS,
  profileValidationSchema,
} from "@/schema/customSchema";
import { RESPONSES, S3_URL, S3_URL_REPLACE } from "@/constants";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { RootState } from "@/lib/redux/store";
import Radio from "@/common/FormInputs";
import { Button, CustomDatepicker, Input } from "@/common";
import { RoundCrossIcon } from "@/app/_ui/svg/_svg";
import CustomNote from "@/common/CustomNote/CustomNote";

interface UserProfileFormValues {
  firstName: string;
  lastName: string;
  gender: string;
  address: string;
  city: string;
  state: string;
  dob: string;
  postCode: string;
  profileImage: string | null;
  phoneNumber: string;
  email: string;
}

const UserProfile: React.FC = () => {
  const { data: userProfile } = useGetUserProfileQuery("");
  const [profileImg, setProfileImage] = useState<string | null>(null);
  const [uploadStatus, setUploadStatus] = useState<string>("idle");
  const [userProfileData, setUserProfileData]: any = useState({});
  const [profileImageCheck, setProfileImageCheck] = useState<string | null>(
    null
  );

  const handleProfileSubmit = async (values: UserProfileFormValues) => {
    try {
      const profileData = {
        ...values,
        profileImage: profileImg?.split(S3_URL)[1],
        phoneNumber: user?.phoneNumber,
      };
      if (
        userProfileData?.address === values?.address &&
        userProfileData?.city === values?.city &&
        userProfileData?.state === values?.state &&
        userProfileData?.postCode === values?.postCode &&
        userProfileData?.lastName === values?.lastName &&
        userProfileData?.gender === values?.gender &&
        userProfileData?.firstName === values?.firstName &&
        userProfileData?.dob === values?.dob &&
        profileImageCheck === values?.profileImage
      ) {
        toaster.error("No change detected");
      } else {
        await updateProfile(profileData);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };
  const formik: FormikProps<UserProfileFormValues> =
    useFormik<UserProfileFormValues>({
      initialValues: {
        firstName: "",
        lastName: "",
        gender: "",
        address: "",
        city: "",
        state: "",
        dob: "",
        postCode: "",
        profileImage: "",
        phoneNumber: "",
        email: "",
      },
      enableReinitialize: true,
      validationSchema: profileValidationSchema,
      onSubmit: async (values) => {
        handleProfileSubmit(values);
      },
    });

  const {
    values,
    errors,
    setFieldValue,
    handleChange,
    handleSubmit,
    touched,
    handleBlur,
    dirty,
  } = formik;

  useEffect(() => {
    if (userProfile?.status === RESPONSES.SUCCESS) {
      const userDetails = userProfile.data.userDetail;
      setProfileImageCheck(userProfile?.data?.profileImage);
      setUserProfileData(userDetails);
      if (userDetails) {
        setFieldValue("firstName", userDetails?.firstName || "");
        setFieldValue("lastName", userDetails?.lastName || "");
        setFieldValue("gender", userDetails?.gender || "");
        setFieldValue("address", userDetails?.address || "");
        setFieldValue("city", userDetails?.city || "");
        setFieldValue("state", userDetails?.state || "");
        setFieldValue("dob", userDetails?.dob || "");
        setFieldValue("postCode", userDetails?.postCode || "");
        setFieldValue("email", userProfile?.data?.email || "");
        setFieldValue("profileImage", userProfile?.data?.profileImage || "");
      }
      let img = userProfile?.data?.profileImage
        ? S3_URL.concat(userProfile?.data?.profileImage)
        : null;

      setProfileImage(img);
    }
  }, [userProfile, setFieldValue]);

  const [updateProfile] = useUpdateProfileMutation();
  const [uploadFile] = useUploadFileMutation();
  const user = useSelector(
    (state: RootState) => state?.reducers?.userDetails?.userDetail
  );

  const handleUpload = async (file: File) => {
    if (!SUPPORTED_FORMATS.includes(file.type)) {
      toaster.error("File format should be JPG, JPEG or PNG");
      setFieldValue("profileImage", null);
      return;
    }
    if (file.size > FILE_SIZE) {
      toaster.error("File size should be less than 3 MB");
      setFieldValue("profileImage", null);
      return;
    }

    try {
      setUploadStatus("uploading");
      const formData = new FormData();
      formData.append("file", file);
      const { data } = await uploadFile(formData);
      setFieldValue("profileImage", file);
      let str3 = data?.data?.imageUrl?.split(S3_URL_REPLACE)[1];
      let img = S3_URL.concat(str3);

      setProfileImage(img);
      setUploadStatus("uploaded");
    } catch (error) {
      setUploadStatus("failed");
      setFieldValue("profileImage", null);
      toaster.error("Failed to upload file");
    }
  };

  const handleSelfieChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.currentTarget.files
      ? event.currentTarget.files[0]
      : null;
    if (file) {
      handleUpload(file);
    }
    // setFieldValue("profileImage", file);
  };

  const removeProfileImage = () => {
    setProfileImage(null);
    setFieldValue("profileImage", null);
  };

  const today = new Date();
  const eighteenYearsAgo = new Date(
    today.setFullYear(today.getFullYear() - 18)
  );
  return (
    <div className="user-profile common-bg common-page">
      <div className="user-profile__form">
        <form onSubmit={handleSubmit}>
          <Row>
            <Col xs={12} md={6} className="pe-xl-5">
              <div className="user-profile__form__heading mb-4 mb-md-5">
                <h3>Personal Information</h3>
              </div>
              <Input
                label="First Name"
                type="text"
                name="firstName"
                // readOnly={true}
                id="firstName"
                onBlur={handleBlur}
                value={values.firstName}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  if (/^[A-Za-z0-9.'\- ]*$/.test(event.target.value)) {
                    handleChange(event);
                  }
                }}
                maxLength={25}
                // onChange={handleChange}
                placeholder="First Name"
                className={
                  touched.firstName && errors.firstName ? "is-invalid" : ""
                }
                error={
                  touched.firstName &&
                  errors.firstName && <>{errors.firstName}</>
                }
              />
              <Input
                label="Last Name"
                type="text"
                name="lastName"
                id="lastName"
                // readOnly={true}
                onBlur={handleBlur}
                value={values.lastName}
                // onChange={handleChange}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  if (/^[A-Za-z0-9.'\- ]*$/.test(event.target.value)) {
                    handleChange(event);
                  }
                }}
                maxLength={25}
                placeholder="Last Name"
                className={
                  touched.lastName && errors.lastName ? "is-invalid" : ""
                }
                error={
                  touched.lastName && errors.lastName && <>{errors.lastName}</>
                }
              />
              <Input
                label="Email"
                type="email"
                readOnly={true}
                onBlur={handleBlur}
                required={"false"}
                value={values?.email}
              />
              <CustomDatepicker
                label="Date of Birth"
                maxDate={new Date()}
                format="dd/MM/yyyy"
                name="dob"
                onChange={(e: any) => {
                  if (e) {
                    setFieldValue("dob", moment(e).format("YYYY-MM-DD"));
                  } else {
                    setFieldValue("dob", null);
                  }
                }}
                value={values.dob ? new Date(values.dob) : null}
                error={touched.dob && errors.dob && <>{errors.dob}</>}
              />

              <>
                <label className="form-label">
                  Gender<sup>*</sup>
                </label>
                <div className="radio-grp">
                  <Radio
                    id="male"
                    name="gender"
                    value={"male"}
                    label="Male"
                    onChange={handleChange}
                    checked={values?.gender === "male"}
                  />
                  <Radio
                    id="female"
                    name="gender"
                    value={"female"}
                    label="Female"
                    onChange={handleChange}
                    checked={values?.gender === "female"}
                  />
                  <Radio
                    id="not_specify"
                    name="gender"
                    value={"not_specified"}
                    label="Prefer not to specify"
                    onChange={handleChange}
                    checked={values?.gender === "not_specified"}
                  />
                </div>
                {touched?.gender && errors?.gender && (
                  <div className="error_message">{errors?.gender}</div>
                )}
              </>

              <div className="user-profile__form__heading mb-4 mb-md-5 mt-5 pt-xl-5">
                <h3>Address</h3>
              </div>
              <Input
                label="Street Address"
                type="text"
                name="address"
                id="address"
                onBlur={handleBlur}
                value={values.address}
                maxLength={35}
                onChange={handleChange}
                placeholder="Street Address"
                className={
                  touched?.address && errors?.address ? "is-invalid" : ""
                }
                error={
                  touched?.address && errors?.address && <>{errors?.address}</>
                }
              />
              <Row>
                <Col md={6}>
                  <Input
                    label="City"
                    type="text"
                    name="city"
                    id="city"
                    onBlur={handleBlur}
                    value={values.city}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                      if (/^[A-Za-z\s]*$/.test(event.target.value)) {
                        handleChange(event);
                      }
                    }}
                    placeholder="City"
                    maxLength={40}
                    className={
                      touched?.city && errors?.city ? "is-invalid" : ""
                    }
                    error={touched?.city && errors?.city && <>{errors.city}</>}
                  />
                </Col>
                <Col md={6}>
                  <Input
                    label="State"
                    type="text"
                    name="state"
                    id="state"
                    onBlur={handleBlur}
                    value={values.state}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                      if (/^[A-Za-z\s]*$/.test(event.target.value)) {
                        handleChange(event);
                      }
                    }}
                    placeholder="State"
                    maxLength={40}
                    className={
                      touched?.state && errors?.state ? "is-invalid" : ""
                    }
                    error={
                      touched?.state && errors?.state && <>{errors?.state}</>
                    }
                  />
                </Col>
              </Row>
              <Input
                label="Postal Code"
                type="number"
                name="postCode"
                id="postCode"
                onBlur={handleBlur}
                value={values.postCode}
                onChange={handleChange}
                placeholder="Postal Code"
                maxLength={10}
                className={
                  touched.postCode && errors.postCode ? "is-invalid" : ""
                }
                error={
                  touched.postCode && errors.postCode && <>{errors.postCode}</>
                }
              />
            </Col>
            <Col md={6} xs={12} className="pt-5 pt-md-0 ps-xl-5">
              <div className="user-profile__form__heading mb-4 mb-md-5">
                <h3>Upload Profile Image</h3>
              </div>
              {profileImg ? (
                <div className="preview-img">
                  <img src={profileImg} alt="Profile Picture" />
                  <button
                    className="preview-img__action"
                    onClick={removeProfileImage}
                    type="button"
                  >
                    <RoundCrossIcon />
                  </button>
                </div>
              ) : (
                <SelfieUpload
                  label="JPG, JPEG, PNG (3MB)"
                  onChange={handleSelfieChange}
                  status={uploadStatus}
                  error={touched.profileImage && errors.profileImage}
                />
              )}
              <CustomNote />
            </Col>
            <Col md={6} className="pe-xl-5 mt-4 mt-xl-5">
              <Button
                text="Submit"
                type="submit"
                className="w-100"
                // disabled={!dirty}
              />
            </Col>
          </Row>
        </form>
      </div>
    </div>
  );
};

export default UserProfile;
