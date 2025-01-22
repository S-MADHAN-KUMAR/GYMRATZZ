import * as yup from 'yup'

export const addProductValidation =  yup.object({
  name: yup.string().required("Product name is required").min(3,"product name must be at least 5 charactor"),
  stock: yup.number().required("Stock is required").min(1, "Stock must be at least 1"),
  category: yup.string().required("Category is required"),
  brand: yup.string().required("Brand is required"),
  description: yup.string().required("Description is required"),
  price: yup.number()
    .required("Price is required")
    .min(1, "Price must be greater than 0"),
  images: yup.array()
    .of(yup.mixed().required("Image is required"))
    .min(3, "At least 3 images are required")
    .max(5, "You can upload up to 5 images only"),
  status: yup.boolean().required("Status is required"),
})

export const commanValidation =  yup.object({
  name: yup.string()
    .min(3, 'Name must be at least 3 characters long')
    .matches(/^[a-zA-Z]+$/, 'Name must only contain letters')
    .required('Name is required'),
    image: yup
    .mixed()
    .nullable()
    .test('fileType', 'Only JPG, PNG, and JPEG formats are allowed', (value) => {
      return value ? ['image/jpeg', 'image/png', 'image/jpg'].includes(value.type) : false
    })
    .required('Image is required'),
})

export const couponValidation = yup.object({
  name: yup.string().required("Coupon name is required") .min(3, 'Name must be at least 3 characters long').matches(/^[a-zA-Z]+$/, 'Name must only contain letters'),
  code: yup.string().required("Coupon code is required").min(5, "code must be at least 5 letters"),
  discount: yup
    .number()
    .min(5, "Discount must be at least 5%")
    .required("Discount percentage is required"),
  minDiscountAmount: yup
    .number()
    .min(0, "Minimum discount amount cannot be negative")
    .required("Minimum discount amount is required"),
  maxDiscountAmount: yup
    .number()
    .min(0, "Maximum discount amount cannot be negative")
    .required("Maximum discount amount is required"),
  startDate: yup
    .date()
    .required("Start date is required")
    .min(new Date(), "Start date cannot be in the past"),
  endDate: yup
    .date()
    .required("End date is required")
    .test(
      "is-different",
      "Start date and End date cannot be the same",
      function (value) {
        const { startDate } = this.parent;
        return startDate !== value; 
      },
    ),
})


export const productOfferValidation =yup.object({
  productId: yup.string().required('Please select a product'),
  discount: yup
    .number()
    .positive('Discount must be greater than zero')
    .required('Please enter a discount'),
  startDate: yup
    .date()
    .required('Please select a start date')
    .test(
      'is-today-or-future',
      'Start date cannot be in the past',
      (value) => value && new Date(value).setHours(0, 0, 0, 0) >= new Date().setHours(0, 0, 0, 0)
    ),
  endDate: yup
    .date()
    .required('Please select an end date')
    .test(
      'is-after-start-date',
      'End date cannot be earlier than the start date',
      function (value) {
        const { startDate } = this.parent;
        return startDate && value && new Date(value) >= new Date(startDate);
      }
    )
})

export const categoryOfferValidation = yup.object({
  categoryId: yup.string().required('Please select a category'),
  discount: yup
    .number()
    .positive('Discount must be greater than zero')
    .required('Please enter a discount'),
  startDate: yup
    .date()
    .required('Please select a start date')
    .test(
      'is-today-or-future',
      'Start date cannot be in the past',
      (value) => value && new Date(value).setHours(0, 0, 0, 0) >= new Date().setHours(0, 0, 0, 0)
    ),
  endDate: yup
    .date()
    .required('Please select an end date')
    .test(
      'is-after-start-date',
      'End date cannot be earlier than the start date',
      function (value) {
        const { startDate } = this.parent;
        return startDate && value && new Date(value) >= new Date(startDate);
      }
    )
});
