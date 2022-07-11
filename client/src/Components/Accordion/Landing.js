import { Component } from "react";

class Landing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      blocks: [
        {
          id: 1,
          title: "Who is the client?",
          body: null,
          expanded: false,
          backgroundColor: "#808080",
        },
        {
          id: 2,
          title: "What is important to them?",
          body: "Form 2",
          expanded: true,
          backgroundColor: "#000080",
        },
        {
          id: 3,
          title: "How do they envision the dining experience",
          body: "Form 3",
          expanded: false,
          backgroundColor: "#A93226",
        },
        {
          id: 4,
          title: "What additional services will best support this experience?",
          body: "Form 4",
          expanded: false,
          backgroundColor: "#16A085",
        },
      ],
    };
  }

  toggle(id, data) {
    this.setState((prevState, props) => {
      const index = prevState.blocks.findIndex((item) => item.id === id);

      prevState.blocks[index].expanded = !prevState.blocks[index].expanded;

      return { blocks: prevState.blocks };
    });
  }

  nextAccoordianOpen(id, data) {
    this.setState((prevState, props) => {
      const index = prevState.blocks.findIndex((item) => item.id === id);
      prevState.blocks[index].expanded = !prevState.blocks[index].expanded;
      prevState.blocks[index + 1].expanded =
        !prevState.blocks[index + 1].expanded;

      return { blocks: prevState.blocks };
    });
  }
  render() {
    return (
      <div>
        {/* <Home></Home> */}
        {/* <dl className="accordion">
          {this.state.blocks.map((item) => (
            <Accordion
              key={item.id}
              title={item.title}
              body={item.body}
              expand={item.expanded}
              bgColor={item.backgroundColor}
              id={item.id}
              onClick={this.toggle.bind(this, item.id)}
              onSubmit={this.nextAccoordianOpen.bind(this, item.id)}
            />
          ))}
        </dl> */}
      </div>
    );
  }
}

export default Landing;
