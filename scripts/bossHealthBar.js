const hpDebounceOne = debounce((valOne) => game.settings.set('BossHealthBar', 'hpValueOne', valOne), 1000);
const hpDebounceTwo = debounce((valTwo) => game.settings.set('BossHealthBar', 'hpValueTwo', valTwo), 1000);

export default class BossHealthBar extends FormApplication {
	
  constructor() {
    super();
		console.log("Boss constructor call start");
  }
  
  static get defaultOptions() {
    return mergeObject(super.defaultOptions, {
      classes: ['form'],
      popOut: false,
      closeOnSubmit: false,
      submitOnChange: true,
      template: `/modules/boss-health-bar/templates/health-bar.hbs`,
      id: 'boss-health-bar',
    });
  }
  
  getData() {
    // Return data to the template
    let isGM = game.user.isGM;
    let hpValueOne = game.settings.get('BossHealthBar', 'hpValueOne');
    let hpValueTwo = game.settings.get('BossHealthBar', 'hpValueTwo');
    let visible = game.settings.get('BossHealthBar', 'visible');
    let secondBarVisible = game.settings.get('BossHealthBar', 'secondBarVisible');
    let bossNameLabelOne = game.settings.get('BossHealthBar', 'bossNameLabelOne');
    let bossNameLabelTwo = game.settings.get('BossHealthBar', 'bossNameLabelTwo');
    return {
      isGM,
      hpValueOne,
      hpValueTwo,
      visible,
			secondBarVisible,
			bossNameLabelOne,
			bossNameLabelTwo,
    };
  }
  
  selectSelectedToken() {
		if(canvas.tokens.controlled && canvas.tokens.controlled[0]) {
			this.selectedTokens = canvas.tokens.controlled;
			
			for (let controlledIndex = 0; controlledIndex < canvas.tokens.controlled.length; controlledIndex++) {
				ui.notifications.info("Selected boss bar for token " + this.selectedTokens[controlledIndex].name);
			}
			
			this.updateHP(0);
			
			console.log("secondBarVisible before selection: " + game.settings.get('BossHealthBar', 'secondBarVisible'))
			
			game.settings.set('BossHealthBar', 'bossNameLabelOne', this.selectedTokens[0].name);
			if(canvas.tokens.controlled.length > 1)
			{
				this.updateHP(1);
				
				game.settings.set('BossHealthBar', 'bossNameLabelTwo', this.selectedTokens[1].name);
				
				game.settings.set('BossHealthBar', 'secondBarVisible', true);
				console.log("Multiple bosses selected");
			}
			else
			{
				game.settings.set('BossHealthBar', 'secondBarVisible', false);
				console.log("1 boss selected");
			}
			
			return this.selectedTokens;
		}
		else {
			ui.notifications.error("No token selected!");
		}
  }
	
	toggleVisibility() {
		game.settings.set('BossHealthBar', 'visible', game.settings.get('BossHealthBar', 'visible') === false);
	}
	
	toggleSecondBarVisibility() {
		game.settings.set('BossHealthBar', 'secondBarVisible', game.settings.get('BossHealthBar', 'secondBarVisible') === false);
	}
	
	updateAllHP()
	{
		for (let controlledIndex = 0; controlledIndex < this.selectedTokens.length; controlledIndex++) {
			this.updateHP(controlledIndex);
		}
	}
	
	updateHP(index)
	{
		let value = this.selectedTokens[index].actor.data.data.attributes.hp.value / this.selectedTokens[index].actor.data.data.attributes.hp.max * 100;
		
		if(index == 0)
		{
			hpDebounceOne(value);
		}
		else if(index == 1)
		{
			hpDebounceTwo(value);
		}
	}

  activateListeners(html) {
    super.activateListeners(html);
  }

  async _updateObject(event, formData) {
    game.settings.set('BossHealthBar', 'hpValueOne', formData.hpValueOne);
    game.settings.set('BossHealthBar', 'hpValueTwo', formData.hpValueTwo);
  }
}