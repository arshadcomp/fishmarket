<template>
  <div class="auth text-center py-5">
    <b-alert variant="primary" show>If you are using our website for the first time, kindly first <strong>Create Account</strong> using the link below before signing in.</b-alert>
    <b-alert variant="success" show>If you fail to recieve OTP for login or have trouble logging in, please send a WhatsApp message with mobile no, to <strong>9972707672</strong> and we will take care of the rest. </b-alert>
    <amplify-authenticator class="d-inline-block">
      <amplify-sign-up
        slot="sign-up"
        username-alias="phone_number"
        :form-fields.prop="formFields"
      ></amplify-sign-up>
      <amplify-sign-in slot="sign-in" username-alias="phone_number" :form-fields.prop="signInFields" ></amplify-sign-in>
    </amplify-authenticator>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data() {
    return {
      formFields: [
        {
          type: 'phone_number',
          label: 'Mobile No',
          dialCode: '+91',
          placeholder: 'Mobile No',
          required: true,
        },
        {
          type: 'email',
          required: true,
        },
        {
          type: 'password',
          label: 'Password',
          placeholder: 'Password',
          required: true,
        },
        {
          type: 'name',
          label: 'Full Name',
          placeholder: 'Full Name',
          required: true,
        },
        {
          type: 'address',
          label: 'Quarter No. (Kaiga Township)',
          placeholder: 'Quarter No.',
          required: true,
        },
      ],
      signInFields: [
        {
          type: 'phone_number',
          label: 'Mobile No',
          dialCode: '+91',
          placeholder: 'Mobile No',
          required: true,
        },
        {
          type: 'password',
          required: true,
        }
      ]
    }
  }
}
</script>