const hpDebounce = debounce((val) => game.settings.set('BossHealthBar', 'progress', val), 1000);

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
    let progress = game.settings.get('BossHealthBar', 'progress');
    let visible = game.settings.get('BossHealthBar', 'visible');
    let isGM = game.user.isGM;
    let bossNameLabel = game.settings.get('BossHealthBar', 'bossNameLabel');
    return {
      isGM,
      progress,
      visible,
			bossNameLabel
    };
  }
  
  selectSelectedToken() {
		if(canvas.tokens.controlled && canvas.tokens.controlled[0]) {
			this.selectedToken = canvas.tokens.controlled[0];
			ui.notifications.info("Selected boss bar for token " + this.selectedToken.name);
			this.updateHP();
			
			game.settings.set('BossHealthBar', 'bossNameLabel', this.selectedToken.name);
			
			return this.selectedToken;
		}
		else {
			ui.notifications.error("No token selected!");
		}
  }
	
	toggleVisibility() {
		game.settings.set('BossHealthBar', 'visible', game.settings.get('BossHealthBar', 'visible') == false);
	}
	
	updateHP()
	{
		let value = this.selectedToken.actor.data.data.attributes.hp.value / this.selectedToken.actor.data.data.attributes.hp.max * 100;
		
		//game.settings.set('BossHealthBar', 'progress', );
		hpDebounce(value);
	}

  activateListeners(html) {
    super.activateListeners(html);
  }

  async _updateObject(event, formData) {
    game.settings.set('BossHealthBar', 'progress', formData.progress);
  }
}