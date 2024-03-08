import io from "socket.io-client";

export class Socket {
  static instance: any = null;

  static getInstance(): any {
    if (!this.instance) {
      const url = "https://necxis-socket-server.onrender.com";
      this.instance = io(url);
      return this.instance;
    }

    return this.instance;
  }
}
