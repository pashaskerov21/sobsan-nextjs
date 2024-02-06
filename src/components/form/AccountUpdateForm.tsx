'use client'
import React, { Fragment } from 'react'
import * as Yup from 'yup'
import { AccountDataType, LoadingType, LocaleType, UserDataType } from '@/src/types'
import { Account } from '@/src/class'
import { useLocalStorage } from 'usehooks-ts'
import { Form, Formik, FormikHelpers } from 'formik'
import Swal from 'sweetalert2'
import { FormWrapper, RadioInputRows } from './style'
import { FaChevronDown } from 'react-icons/fa'
import { Collapse } from 'react-bootstrap'
import Skeleton from '../skeleton/Skeleton'
import FormComponent from './FormComponent'

type FormProps = {
  activeLocale: LocaleType,
  activeUserData: UserDataType,
  loading: LoadingType,
  titleDictionary: { [key: string]: string },
  generalDictionary: { [key: string]: string },
  formDictionary: {
    [key: string]: {
      [key: string]: string
    }
  },
  collapseState: {
    account: boolean,
    order: boolean,
    list: boolean,
    profile_info: boolean,
    account_info: boolean,
    delivery_info: boolean,
  },
  handleCollapseButton: (key: 'account' | 'order' | 'list' | 'profile_info' | 'account_info' | 'delivery_info') => void,
}

type AccountUpdateFormValueType = {
  firstName: string,
  lastName: string,
  gender: "male" | "female",
  address: string,
  phone: string | number,
  phone_2: string | number,
  email: string,
  password: "",
  password_confirm: "",
  city: string,
  region: string,
  address_detail: string,
}

const AccountUpdateForm: React.FC<FormProps> = ({
  activeLocale,
  activeUserData,
  formDictionary,
  generalDictionary,
  loading,
  titleDictionary,
  collapseState,
  handleCollapseButton
}) => {
  const [accountData, setAccountData] = useLocalStorage<AccountDataType>('accounts', {
    activeUser: undefined,
    users: [],
  });
  const account = new Account(accountData);

  const initialValues: AccountUpdateFormValueType = {
    firstName: activeUserData.profile.firstName,
    lastName: activeUserData.profile.lastName,
    gender: activeUserData.profile.gender ? activeUserData.profile.gender : "male",
    address: activeUserData.profile.address ? activeUserData.profile.address : '',
    phone: activeUserData.profile.phone,
    phone_2: activeUserData.profile.phone_2 ? activeUserData.profile.phone_2 : '',
    email: activeUserData.account.email,
    password: "",
    password_confirm: "",
    city: activeUserData.delivery ? activeUserData.delivery.city ? activeUserData.delivery.city : '' : '',
    region: activeUserData.delivery ? activeUserData.delivery.region ? activeUserData.delivery.region : '' : '',
    address_detail: activeUserData.delivery ? activeUserData.delivery.address_detail ? activeUserData.delivery.address_detail : '' : '',
  }
  const validationSchema = Yup.object({
    firstName: Yup.string().required(`${formDictionary.error.firstName_required}`),
    lastName: Yup.string().required(`${formDictionary.error.lastName_required}`),
    phone: Yup.string().required(`${formDictionary.error.phone_required}`),
    email: Yup.string().email(`${formDictionary.error.email_format}`).required(`${formDictionary.error.email_required}`),
    password: Yup.string()
      .min(8, `${formDictionary.error.password_min_length}`)
      .matches(
        /^(?=.*[a-z])/,
        `${formDictionary.error.password_lowercase}`
      )
      .matches(
        /^(?=.*[A-Z])/,
        `${formDictionary.error.password_uppercase}`
      )
      .matches(
        /^(?=.*\d)/,
        `${formDictionary.error.password_digit}`
      )
      .matches(
        /^(?=.*[@$!%*?&])/,
        `${formDictionary.error.password_special_character}`
      ),
    password_confirm: Yup.string()
      .min(8, `${formDictionary.error.password_min_length}`)
      .oneOf([Yup.ref('password')], `${formDictionary.error.password_confirm_match}`)
      .matches(
        /^(?=.*[a-z])/,
        `${formDictionary.error.password_lowercase}`
      )
      .matches(
        /^(?=.*[A-Z])/,
        `${formDictionary.error.password_uppercase}`
      )
      .matches(
        /^(?=.*\d)/,
        `${formDictionary.error.password_digit}`
      )
      .matches(
        /^(?=.*[@$!%*?&])/,
        `${formDictionary.error.password_special_character}`
      ),
  });

  const onSubmit = (values: AccountUpdateFormValueType, actions: FormikHelpers<AccountUpdateFormValueType>) => {
    if (values.password && !values.password_confirm) {
      actions.setFieldError('password_confirm', `${formDictionary.error.password_confirm_required}`);
    } else {
      const newUpdateData: UserDataType = {
        ...activeUserData,
        profile: {
          firstName: values.firstName,
          lastName: values.lastName,
          phone: values.phone,
          address: values.address,
          gender: values.gender,
          phone_2: values.phone_2,
        },
        account: {
          email: values.email,
          password: values.password ? values.password : activeUserData.account.password,
        },
        delivery: {
          city: values.city,
          region: values.region,
          address_detail: values.address_detail
        }
      }
      setAccountData(account.updateUserData(newUpdateData));
      Swal.fire({
        icon: "success",
        title: generalDictionary["congratulations"],
        text: generalDictionary["save_message"],
      });
      actions.resetForm({
        values: {
          ...values,
          password: "",
          password_confirm: ""
        }
      });
    }
  }
  return (
    <FormWrapper className='accout__update__form'>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {
          formik => (
            <Form autoComplete='off'>
              <div className="account__collapse">
                {
                  loading.lazy ? <Skeleton width='100%' height='55px' margin='0 0 1px 0' /> : (
                    <div className="account__collapse__button" onClick={() => handleCollapseButton('profile_info')}>
                      <div className="title">{generalDictionary["profil_informations"]}</div>
                      <div className="arrow__button">
                        <FaChevronDown />
                      </div>
                    </div>
                  )
                }
                <Collapse in={collapseState.profile_info}>
                  <div className="account__collapse__inner">
                    <div className="form__components__grid">
                      {
                        loading.lazy ? (
                          <Fragment>
                            <Skeleton className='grid__col' width='100%' height='70px' />
                            <Skeleton className='grid__col' width='100%' height='70px' />
                            <Skeleton className='grid__col' width='100%' height='70px' />
                            <Skeleton className='grid__col' width='100%' height='70px' />
                            <Skeleton className='grid__col' width='100%' height='70px' />
                            <Skeleton className='grid__col' width='100%' height='70px' />
                          </Fragment>
                        ) : (
                          <Fragment>
                            <div className="grid__col">
                              <FormComponent
                                control='input'
                                name='firstName'
                                type='text'
                                label={formDictionary.label.firstName + ' *'}
                                formik={formik}
                                value={formik.values.firstName}
                              />
                            </div>
                            <div className="grid__col">
                              <FormComponent
                                control='input'
                                name='lastName'
                                type='text'
                                label={formDictionary.label.lastName + ' *'}
                                formik={formik}
                                value={formik.values.lastName}
                              />
                            </div>
                            <div className="grid__col">
                              <RadioInputRows>
                                <div className="title">{formDictionary.label["gender"]}:</div>
                                <FormComponent
                                  control='radio'
                                  type='radio'
                                  label={formDictionary.label['male']}
                                  value="male"
                                  name='gender'
                                  formik={formik}
                                  checked={formik.values.gender === "male"}
                                />
                                <FormComponent
                                  control='radio'
                                  type='radio'
                                  label={formDictionary.label['female']}
                                  value="female"
                                  name='gender'
                                  formik={formik}
                                  checked={formik.values.gender === "female"}
                                />
                              </RadioInputRows>
                            </div>
                            <div className="grid__col">
                              <FormComponent
                                control='input'
                                name='address'
                                type='text'
                                label={formDictionary.label.address}
                                formik={formik}
                                value={formik.values.address}
                              />
                            </div>
                            <div className="grid__col">
                              <FormComponent
                                control='input'
                                name='phone'
                                type='number'
                                label={formDictionary.label.phone + ' *'}
                                formik={formik}
                                value={`${formik.values.phone}`}
                              />
                            </div>
                            <div className="grid__col">
                              <FormComponent
                                control='input'
                                name='phone_2'
                                type='number'
                                label={formDictionary.label.phone_2}
                                formik={formik}
                                value={`${formik.values.phone_2}`}
                              />
                            </div>
                          </Fragment>
                        )
                      }
                    </div>
                  </div>
                </Collapse>
              </div>
              <div className="account__collapse">
                {
                  loading.lazy ? <Skeleton width='100%' height='55px' margin='0 0 1px 0' /> : (
                    <div className="account__collapse__button" onClick={() => handleCollapseButton('account_info')}>
                      <div className="title">{generalDictionary["account_informations"]}</div>
                      <div className="arrow__button">
                        <FaChevronDown />
                      </div>
                    </div>
                  )
                }
                <Collapse in={collapseState.account_info}>
                  <div className="account__collapse__inner">
                    <div className="form__components__grid">
                      {
                        loading.lazy ? (
                          <Fragment>
                            <Skeleton className='grid__col full' width='100%' height='70px' />
                            <Skeleton className='grid__col' width='100%' height='70px' />
                            <Skeleton className='grid__col' width='100%' height='70px' />
                          </Fragment>
                        ) : (
                          <Fragment>
                            <div className="grid__col full">
                              <FormComponent
                                control='input'
                                name='email'
                                type='email'
                                label={formDictionary.label.email + ' *'}
                                formik={formik}
                                value={formik.values.email}
                              />
                            </div>
                            <div className="grid__col">
                              <FormComponent
                                control='input'
                                name='password'
                                type='password'
                                label={formDictionary.label.password}
                                formik={formik}
                              />
                            </div>
                            <div className="grid__col">
                              <FormComponent
                                control='input'
                                name='password_confirm'
                                type='password'
                                label={formDictionary.label.password_confirm}
                                formik={formik}
                              />
                            </div>
                          </Fragment>
                        )
                      }
                    </div>
                  </div>
                </Collapse>
              </div>
              <div className="account__collapse">
                {
                  loading.lazy ? <Skeleton width='100%' height='55px' margin='0 0 1px 0' /> : (
                    <div className="account__collapse__button" onClick={() => handleCollapseButton('delivery_info')}>
                      <div className="title">{generalDictionary["delivery_informations"]}</div>
                      <div className="arrow__button">
                        <FaChevronDown />
                      </div>
                    </div>
                  )
                }
                <Collapse in={collapseState.delivery_info}>
                  <div className="account__collapse__inner">
                    <div className="form__components__grid">
                      {
                        loading.lazy ? (
                          <Fragment>
                            <Skeleton className='grid__col' width='100%' height='70px' />
                            <Skeleton className='grid__col' width='100%' height='70px' />
                            <Skeleton className='grid__col full' width='100%' height='200px' />
                          </Fragment>
                        ) : (
                          <Fragment>
                            <div className="grid__col">
                              <FormComponent
                                control='input'
                                name='city'
                                type='text'
                                label={formDictionary.label.city}
                                formik={formik}
                                value={formik.values.city}
                              />
                            </div>
                            <div className="grid__col">
                              <FormComponent
                                control='input'
                                name='region'
                                type='text'
                                label={formDictionary.label.region}
                                formik={formik}
                                value={formik.values.region}
                              />
                            </div>
                            <div className="grid__col full">
                              <FormComponent
                                control='textarea'
                                name='address_detail'
                                label={formDictionary.label.address_additional_info}
                                formik={formik}
                                value={formik.values.address_detail}
                              />
                            </div>
                          </Fragment>
                        )
                      }
                    </div>
                  </div>
                </Collapse>
              </div>
              {
                loading.lazy ? <Skeleton width='100%' height='55px' /> : <button type='submit'>{generalDictionary["save"]}</button>
              }
            </Form>
          )
        }
      </Formik>
    </FormWrapper>
  )
}

export default React.memo(AccountUpdateForm)
