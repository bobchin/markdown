const pako = require('pako')

const diagramSource = `
nwdiag{
    network internet {
        rtx830 [address = "61.213.110.203"];
    }

    network work {
        address = "172.17.17.0/24"

        rtx830 [address = "172.17.1.254"];
        WG2200HP [address = "172.17.1.250"];
        WG1800HP4 [address = "172.17.1.249"];
        PC;
        Smartphone;
        Printer;
    }

    network camera {
        address ="192.168.111.0/24"

        rtx830 [address = "192.168.111.254"];
        Recorder [address = "192.168.111.100"];
        Camera [address = "192.168.111.1-12"];
    }

    network customer {
        address = "192.168.200.0/24"

        rtx830 [address = "192.168.200.254"];
        WZR-HP-G302H [address = "192.168.200.253"];
        Clients [address = "192.168.200.1-30"];
    }
}
`

const data = Buffer.from(diagramSource, 'utf8')
const compressed = pako.deflate(data, { level: 9 })
const result = Buffer.from(compressed)
  .toString('base64')
  .replace(/\+/g, '-').replace(/\//g, '_')

console.log(result)
