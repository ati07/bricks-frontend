
const reg = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

export const validateDbaForm = (data) => {
    // console.log("data", data);
    const {clientId, merchantId, dba, mcc,mid, midStatus, ethocaARN,selectCaidOrArn,rdrCAID ,rdrARN, visaBin, masterCardBin,rdrActivation,
    ethocaActivation,domainWebPage,currency } = data
    if(clientId ===''
       || merchantId ===''
       || dba ===''
       || mcc ===''
       || mid ===''
       || currency ===''
       || rdrActivation ===''
       || ethocaActivation ===''
       ){
        return true
    }
    
    if ((rdrActivation === 'No' || rdrActivation === '')
        && (ethocaActivation === 'No'|| ethocaActivation ==='')) {
        console.log('1')

        return true
    } 
    if (rdrActivation === 'Yes'
        && (ethocaActivation === 'No' || ethocaActivation ==='')
        ) {
        console.log('2')
                    if(selectCaidOrArn !== ''){
                        if ((rdrCAID !== '' || rdrARN !== '')
                                    && visaBin !== '') {
                                    return false

                                } else {
                                    return true
                                }
                    }else{
                        return true
                    }
    } 
    if ((rdrActivation === 'No' || rdrActivation === '')
        && ethocaActivation === 'Yes') {
        console.log('3')
        if (masterCardBin !== ''
            && ethocaARN !== '') {
            return false
        } else {
            return true
        }
    } 
    if (rdrActivation === 'Yes'
        && ethocaActivation === 'Yes') {
        console.log('4')
        if(selectCaidOrArn !==''){
                if ((rdrCAID !== '' || rdrARN !== '')
                            && visaBin !== ''
                        ) {
                            if (masterCardBin !== ''
                                && ethocaARN !== '') {
                                return false
                            } else {
                                return true
                            }
                        } else {
                            return true
                        }
        }else{
            return true
        }
    } 
    
    return false
    
}

export const validateClientForm = (data) => {
    const { company, email,invoiceEmail,rdrTier1Price,rdrTier2Price,rdrTier3Price, name,rdrPrice,ethocaPrice,monthlyMinimumFees,paymentTerms } = data
    
    if (company === ''
        || (email === '' || !email.match(reg))
        || (invoiceEmail !=='' ? !invoiceEmail?.match(reg) : false)
        || rdrTier1Price ===''
        || rdrTier2Price ===''
        || rdrTier3Price===''
        || ethocaPrice ===''
        || paymentTerms ===''
        || name === '') {
        return true
    } else {
        return false
    }
}

export const validateMerchantForm = (data) => {
    const { merchant, typeOfBusiness, clientId, email } = data
    // console.log("dataM",data)
    if (merchant === ''
        || typeOfBusiness === ''
        || clientId === ''
        || (email !=='' ? !email?.match(reg) : false)
        ) {
        return true
    } else {
        return false
    }
}

export const validateUserForm = (data,id) => {
    const { name,email,role,clientId,password,changePassword } = data
    if (name === ''
        || role === ''
        || ((changePassword ==='Yes' || id ==='') && password ==='' )
        || (email === '' || !email.match(reg))
        || (role ==='Client' || role ==='User') && clientId ===''
        || ((JSON.parse(localStorage.getItem('user') ?? '').role ==='Admin' && id === '' || JSON.parse(localStorage.getItem('user') ?? '').role ==='CRM_Admin' && id === '') ? false : clientId === '')
        ) {
        return true
    } else {
        return false
    }
}

export const validateRdrAlertsForm = (data)=>{
 const {clientId,merchantId,merchantAccountId,caseReceivedDate,caseAmount,status,statusCode,caseCurrencyCode} = data

        if(clientId ===''
            || merchantId ===''
            || merchantAccountId ===''
            || caseAmount ===''
            || status ===''
            || statusCode ===''
            || caseCurrencyCode ===''
            ){

                return true
           }else{
                return false
           }
}

export const validateEthocaAlertsForm=(data)=>{
    const {merchantAccountId,
    merchantId,
    clientId,
    amount,
    arn,
    cardBrand,
    cardFirst6,
    cardLast4,
    currency,
    mid,
    orderGuid,
    orderId,
    preventionCaseNumber,
    preventionGuid,
    preventionTimestamp,
    preventionType,
    transactionTimestamp}= data

    if(merchantAccountId ===''
        || merchantId ===''
        || clientId ===''
        || amount ===''
        || arn ===''
        || cardBrand ===''
        || cardFirst6 ===''
        || cardLast4 ===''
        || currency ===''
        || mid ===''
        || orderGuid ===''
        || orderId ===''
        || preventionCaseNumber ===''
        || preventionGuid ===''
        || preventionTimestamp ===''
        || preventionType ===''
        || transactionTimestamp ===''){
        return true

    }else{
        return false
    }
}
export const validateChargebackForm=(data)=>{
    const {
        clientId,
        merchantId,
        merchantAccountId,
        cardHolder ,
        fileDate ,
        mid,
        cbCode,
        transactionId,
        transactionDate,
        cbFee,
        dueDate,
        cardNumber,
        amount,
        status,
        country,
                }= data

    if(
        clientId===''
        || merchantId===''
        || merchantAccountId===''
        || cardHolder ===''
        || fileDate ===''
        || mid===''
        || cbCode===''
        || transactionId===''
        || transactionDate===''
        || cbFee===''
        || dueDate===''
        || cardNumber===''
        || amount===''
        || status===''
        || country===''
    ){
        return true

    }else{
        return false
    }
}

export const validateInvoiceForm=(data) => {
    let {category,clientId,merchantAccountId,merchantId,rdrTier1Price,rdrTier2Price,rdrTier3Price,ethocaPrice,paymentTerms,startDate,endDate,dueDate}=data
    if( category ===''
        || clientId ===''
        || (category !=='Client' && merchantAccountId ==='')
        || (category !=='Client' && merchantId ==='')
        // || rdrTier1Price ===''
        // || rdrTier2Price ===''
        // || rdrTier3Price===''
        || startDate ===''
        || endDate ===''
        || dueDate ===''
        // || ethocaPrice ===''
        // || paymentTerms ===''
        ){
            return true
        }else{
            return false
        }

        
}

export const validateInvoiceUpdateForm=(data)=>{
    const {status,partialPaidAmount,amount} = data
    if(status ===''
        || (status ==='Partial Payment' && partialPaidAmount ==='')
        || (parseFloat(partialPaidAmount) > parseFloat(amount) )
        ){
            return true
    }else{
        return false
    }
}
export const validateLoginForm=({email,value})=>{
    if((email === '' || !email.match(reg))
       || value ===''){
        return true
    }else{
        return false
    }
}

export const validateCRMForm = (data) => {
  const {company,website,status,contacts} = data

  if(company !== '' 
  && website !==''
  && status !==''){
    
    let error;
    // contacts.map((i)=>{
        
    // })
    for(let i = 0; i <contacts.length; i++){
        if(contacts[i].check){
            if((contacts[i].email !== '' && contacts[i].email.match(reg))
               && contacts[i].contact !==''
               && contacts[i].im !==''
               && contacts[i].position !=='' 
               ){
                error = false    
            }else{
                error = true
                break
            }
        } 
    }
    return error

  }else{
    return true
  }
}


// export const validateDbaForm = (data) => {
//     // console.log("data", data);
//     const { activate_rdr, activate_ethoca, arn, visa_bin, mastercard_bin, caid } = data
//     if (activate_rdr === ''
//         && activate_ethoca === '') {
//         return true
//     } else if (activate_rdr === 'No'
//         && activate_ethoca === 'No') {
//         return false
//     } else if (activate_rdr === 'Yes'
//         && activate_ethoca === 'No') {
//         if ((caid !== '' || arn !== '')
//             && visa_bin !== '') {
//             return false

//         } else {
//             return true
//         }
//     } else if (activate_rdr === 'No'
//         && activate_ethoca === 'Yes') {
//         if (mastercard_bin !== ''
//             && arn !== '') {
//             return false
//         } else {
//             return true

//         }
//     } else if (activate_rdr === 'Yes'
//         && activate_ethoca === 'Yes') {
//         if ((caid !== '' || arn !== '')
//             && visa_bin !== ''
//             ) {
//             if (mastercard_bin !== ''
//                 && arn !== '') {
//                 return false
//             } else {
//                 return true

//             }
//         } else {
//             return true
//         }

//     } else{
//         return false
//     }
//     // else if (activate_rdr !== ''
//     //     && (activate_ethoca === '' || activate_ethoca === 'No')) {
//     //     if (caid !== ''
//     //         && visa_bin !== ''
//     //         && arn !== '') {
//     //         return false
//     //     } else {
//     //         return true
//     //     }
//     // } else if ((activate_rdr === '' || activate_rdr === 'No')
//     //     && activate_ethoca !== '') {
//     //     if (mastercard_bin !== ''
//     //         && arn !== '') {
//     //         return false
//     //     } else {
//     //         return true

//     //     }
//     // } else {
//     //     return true
//     // }
// }

// // else if (activate_rdr !== ''
// // && caid !== ''
// // && visa_bin !== ''
// // && arn !== '') {
// // return false
// // } else if (activate_ethoca !== ''
// // && mastercard_bin !== ''
// // && arn !== '') {
// // return false
// // }