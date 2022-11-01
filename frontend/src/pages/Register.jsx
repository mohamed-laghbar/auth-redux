import React from 'react'
import Input from '../components/Input'
import Button from '../components/Button'

function Register() {
  return (
    <div className="flex min-h-full items-center justify-center py-12 m:px-6 lg:px-8">
      <form>
        <Input label="Full Name" type="text" />
        <Input label="Username" type="email" />
        <Input label="Password" type="password" />
        <Button type="submit" title="Register"/>
      </form>
    </div>

  )
}

export default Register