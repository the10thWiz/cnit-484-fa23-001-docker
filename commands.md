# Commands

## Docker server

domain name: \*.cnit484fa23grp1.com

### As Root

$ apt install doas
$ echo "permit persist :wheel" > /etc/doas.conf
$ groupadd -U matt wheel

### As matt

Add the following to /etc/network/interfaces

```conf
iface ens33 inet static
  address 192.168.105.8
  netmask 255.255.255.224
  gateway 192.168.105.1
```

$ echo "nameserver 192.168.105.5\nnameserver 192.168.105.6" > /etc/resolv.conf
$ doas apt install docker docker-compose git
$ doas usermod -aG docker matt

Set the following in /etc/ssh/sshd_config

```conf
PubkeyAuthentication yes
AuthorizedKeysFile .ssh/authorized_keys
PasswordAuthentication no
```

### Install and start docker containers

$ git clone https://github.com/the10thWiz/cnit-484-fa23-001-docker.git
$ cd cnit-484-fa23-001-docker
$ docker-compose up

### Tools used for testing

$ doas apt install netcat nmap termshark net-tools

## Wireless controller

- System Name: CNIT484fa23grp1-wlc
- Admin username: admin
- Password: Delta-Curing-Duo-Bronze
- Link aggregation: No
- Mangement IP: 192.168.110.8 / 255.255.255.128
- Defualt route: 192.168.110.1
- Mangement VLAN: 0
- Mangement Interface: 1
- Management DHCP Server: 192.168.105.5
- Virtual Gateway IP: 192.168.0.1
- Multicast Ip Address: 239.1.1.1
- Mobility/RF Group Name: wlc-1
- SSID: CNIT484Clinic
- DHCP Bridging: No
- Allow static: No
- RADIUS:
  - IP: 192.168.105.8
  - Port: -
  - Secret: CNIT484Fa23grp1!
- Use default to NTP: No

