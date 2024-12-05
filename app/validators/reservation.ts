import vine from '@vinejs/vine'

export const reservationCreateValidator = vine.compile(
  vine.object({
    carId: vine.number(),
    startDate: vine.string(),
    endDate: vine.string(),
  })
)
export const reservationUpdateValidator = vine.compile(
  vine.object({
    carId: vine.number().optional(),
    startDate: vine.string().optional(),
    endDate: vine.string().optional(),
    totalPrice: vine.number().positive().optional(),
  })
)