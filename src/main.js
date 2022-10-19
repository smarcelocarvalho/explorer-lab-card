import "./css/index.css"
import IMask from "imask"

// Mudança de estilo com setAttribute
const ccBgColor = document.querySelector(".cc-bg svg rect")
const ccLogo = document.querySelector(".cc-logo span:nth-child(2) img")

function setCardType(type) {
  const colors = {
    visa: ["#004e98"],
    mastercard: ["#dc2f02"],
    americanexpress: ["#111d13"],
    maestro: ["#10002b"],
    discover: ["#4d1929"],
    diners: ["#0a2472"],
    jcb: ["#c1121f"],
    default: ["#212529"],
  }
  ccBgColor.setAttribute("fill", colors[type])
  ccLogo.setAttribute("src", `/cc-${type}.svg`)
}
globalThis.setCardType = setCardType

// CVC
const inputSecurityCode = document.querySelector("#security-code")
const securityCodePattern = {
  mask: "0000",
}
const securityMasked = IMask(inputSecurityCode, securityCodePattern)

// DATA EXP
const inputDateExp = document.querySelector("#expiration-date")
const dateExpPattern = {
  mask: "MM{/}YY",
  blocks: {
    MM: {
      mask: IMask.MaskedRange,
      from: 1,
      to: 12,
    },
    YY: {
      mask: IMask.MaskedRange,
      from: new String(new Date().getFullYear()).slice(2),
      to: String(new Date().getFullYear() + 10).slice(2)
    }
  }
}
const dateExpMasked = IMask(inputDateExp, dateExpPattern)

// NUMBER CARD
const inputNumberCard = document.querySelector("#card-number")
const cardNumberPattern = {
  mask: [
    {
      mask: "0000 0000 0000 0000",
      regex: /^4\d{0,15}/,
      cardtype: "visa",
    },
    {
      mask: "0000 0000 0000 0000",
      regex: /^(5[1-5]\d{0,2}|^22[2-9]\d{0,1}|^2[3-7]\d{0,2})\d{0,12}/,
      cardtype: "mastercard",
    },
    {
      mask: "0000 000000 00000",
      regex: /^3[47]\d{0,13}/,
      cardtype: "americanexpress",
    },
    {
      mask: "0000 0000 0000 0000",
      regex: /^(?:5[0678]\d{0,2}|6304|67\d{0,2})\d{0,12}/,
      cardtype: "maestro",
    },
    {
      mask: "0000 0000 0000 0000",
      regex: /^(?:6011|65\d{0,2}|64[4-9]\d?)\d{0,12}/,
      cardtype: "discover",
    },
    {
      mask: "0000 000000 0000",
      regex: /^3(?:0([0-5]|9)|[689]\d?)\d{0,11}/,
      cardtype: "diners",
    },
    {
      mask: "0000 0000 0000 0000",
      regex: /^(?:35\d{0,2})\d{0,12}/,
      cardtype: "jcb",
    },
    {
      mask: "0000 0000 0000 0000",
      cardtype: "default",
    },
  ],
  dispatch: function (appended, dynamicMasked) {
    // Pegando somente os numeros digitados, troca "NÃO DIGITO" por vazio
    const number = (dynamicMasked.value + appended).replace(/\D/g, "")
    const foundMask = dynamicMasked.compiledMasks.find(function (item) {
      return number.match(item.regex)
    })
    setCardType(foundMask.cardtype)
    return foundMask
  },
}
const cardNumberMasked = IMask(inputNumberCard, cardNumberPattern)
