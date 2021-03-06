const indexing: Map<Number, String> = new Map()
const ErrCodeList = {
  100: 'Continue',
  101: 'Switching Protocol',
  102: 'Processing',
  200: 'OK',
  201: 'Created',
  202: 'Accepted',
  203: 'Non-Authoritative Information',
  204: 'No Content',
  205: 'Reset Content',
  206: 'Partial Content',
  300: 'Multiple Choice',
  301: 'Moved Permanently',
  302: 'Found',
  303: 'See Other',
  304: 'Not Modified',
  305: 'Use Proxy',
  306: 'Unused',
  307: 'Temporary Redirect',
  308: 'Permanent Redirect',
  400: 'Bad Request',
  401: 'Unauthorized',
  402: 'Payment Required',
  403: 'Forbidden',
  404: 'Not Found',
  405: 'Method Not Allowed',
  406: 'Not Acceptable',
  407: 'Proxy Authentication Required',
  408: 'Request Timeout',
  409: 'Conflict',
  410: 'Gone',
  411: 'Length Required',
  412: 'Precondition Failed',
  413: 'Payload Too Large',
  414: 'URI Too Long',
  415: 'Unsupported Media Type',
  416: 'Requested Range Not Satisfiable',
  417: 'Expectation Failed',
  418: 'I\'m a teapot',
  419: 'Misdirected Request',
  425: 'Too Early',
  426: 'Upgrade Required',
  428: 'Precondition Required',
  429: 'Too Many Requests',
  431: 'Request Header Fields Too Large',
  451: 'Unavailable For Legal Reasons',
  500: 'Internal Server Error',
  501: 'Not Implemented',
  502: 'Bad Gateway',
  503: 'Service Unavailable',
  504: 'Gateway Timeout',
  505: 'HTTP Version Not Supported',
  507: 'Insufficient Storage',
  511: 'Network Authentication Required',
}

export default function(code: Number): String {
  for (const [i, content] of Object.entries(ErrCodeList)) { indexing.set(parseInt(i) as Number, content) }
  return indexing.get(code) as String
}

export function getErrCodeList(): any {
  return {
    default: ErrCodeList,
    toMap: () => {
      for (const [i, content] of Object.entries(ErrCodeList)) { indexing.set(parseInt(i) as Number, content) }
      return indexing
    },
    keys: () => {
      return Object.keys(ErrCodeList)
    },
    values: () => {
      return Object.values(ErrCodeList)
    },
    entries: () => {
      return Object.entries(ErrCodeList)
    },
  }
}
