import * as roleTypes from './roleTypes'

const components = {
  FrontPage: [roleTypes.ANONYMOUS],
  FrontPageSalons: [roleTypes.ANONYMOUS, roleTypes.SALON_ADMIN],
  HowTo: [roleTypes.MATE, roleTypes.SALON_ADMIN],
  MateHowTo: [roleTypes.MATE],
  Partners: [roleTypes.MATE],
  Balance: [roleTypes.MATE],
  Salons: [roleTypes.MATE],
  Profile: [roleTypes.MEMBER],
  Salon: [roleTypes.ANONYMOUS],
  SalonHowTo: [roleTypes.SALON_ADMIN],
  SalonAdminSalon: [roleTypes.SALON_ADMIN, roleTypes.SALON_ADMIN_ADDING],
  SalonAdminClients: [roleTypes.SALON_ADMIN],
  SalonAdminReceipts: [roleTypes.SALON_ADMIN],
  SalonAdminBills: [roleTypes.SALON_ADMIN],
  Sign: [roleTypes.ANONYMOUS],
  SignSalon: [roleTypes.ANONYMOUS],
  SignOut: [roleTypes.MEMBER],
  Admin: [roleTypes.ADMIN],
}

const access = {
  user: {
    isAnon: roles => roles.find(role => role === roleTypes.ANONYMOUS),
    isAdmin: roles => roles.find(role => role === roleTypes.ADMIN),
    isMember: roles => roles.find(role => role === roleTypes.MEMBER),
    isMate: roles => roles.find(role => role === roleTypes.MATE),
    isSalonAdmin: roles => roles.find(role => role === roleTypes.SALON_ADMIN),
    isSalonOwner: roles => roles.find(role => role === roleTypes.SALON_OWNER),
  },
  isGranted: (userRoles, componentName) => {
    if(!components[componentName]) {
      return false
    }

    if(components[componentName].includes(roleTypes.ANONYMOUS)
        && components[componentName].length === 1
        && componentName.indexOf('Sign') === -1) {
      return true
    }

    const matches = userRoles.filter(role =>
      components[componentName].includes(role)
    )

    return Boolean(matches.length)
  }
}

export default access
